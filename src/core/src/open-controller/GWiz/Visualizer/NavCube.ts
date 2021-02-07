import * as THREE from 'three';
import { Vector3 } from 'three';
import GWizCanvas from './GWizCanvas';
import GWizCamera from './GWizCamera';
import {Logger} from '../../../utils/logging';
import GWizApplicator from './GWizApplicator';
import {INavCubePreferences, IVisualizerStyles, RenderGroupType} from '../types';

//https://github.com/yoavmil/angular-threejs-starter/blob/nav-cube/src/app/nav-cube/nav-cube.ts

enum Sides {
  Front = 1 << 1,
  Back = 1 << 2,
  Left = 1 << 3,
  Right = 1 << 4,
  Top = 1 << 5,
  Bottom = 1 << 6,
}

const allSides = [Sides.Front, Sides.Back, Sides.Left, Sides.Right, Sides.Top, Sides.Back];

class NavCube {
  styles: IVisualizerStyles;
  canvas: GWizCanvas;
  renderer: THREE.WebGLRenderer;
  localCamera: GWizCamera;
  scene: THREE.Scene;

  private _cubeMesh: THREE.Mesh;
  private _northStar: THREE.Mesh;
  private _div?: HTMLDivElement;
  private _range = 10;
  private _zoom = 0.8;
  public log: Logger;

  public get trackedCamera(): GWizCamera { return this.canvas.camera; }

  public get chamfer(): number { return (this.styles.navCube.chamfer ?? 0); }

  constructor(canvas: GWizCanvas, styles: IVisualizerStyles) {
    this.canvas = canvas;
    this.styles = styles;
    this.log = canvas.openController.ows.logManager.getLogger('NavCube');

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setClearColor(0, 0); // transparent background

    this._cubeMesh = new THREE.Mesh();
    this.createMainFacets();
    this.createEdgeFacets();
    this.createCornerFacets();
    this.createLabels();

    const geometry = new THREE.ConeGeometry(0.2, 0.5);
    const material = new THREE.MeshBasicMaterial(this.styles.renderGroups[RenderGroupType.P]);
    this._northStar = new THREE.Mesh( geometry, material );

    this.scene = new THREE.Scene();
    this.scene.add(this._cubeMesh);

    this.localCamera = new GWizCamera();
    // this.localCamera.up = this.camera.up.clone();
    this.localCamera.setRange( 0.01, this._range);
    this.localCamera.position.copy(new Vector3(0, 5, 0));
    this.localCamera.lookAt(0, 0, 0);
  }

  update(cameraNormal: THREE.Vector3, lookNormal: THREE.Vector3): void {
    // const distanceMult = this._range * 0.5;
    // this.localCamera.position.copy( cameraNormal.multiplyScalar(distanceMult) );
    // this.localCamera.lookAt(0, 0, 0);


    this._cubeMesh.position.copy(this.canvas.center);
    this._northStar.position.copy(this.canvas.center);

    this.localCamera.position.copy(lookNormal).multiplyScalar(this._range * (1 - this._zoom));
    this.localCamera.lookAt(this.canvas.center);

    this.log.debug('star', this._northStar.position, 'camera', this.localCamera.position);
  }

  draw(div: HTMLDivElement): void {
    if (this._div == null) {
      div.innerHTML = '';
      div.appendChild(this.renderer.domElement);
      div.onclick = (event: MouseEvent) => {
        this.onClick(event);
      };
      this._div = div;
    } else if (this._div.id !== div.id) {
      throw new Error(`Div mismatch: ${this._div.id} => ${div.id}`);
    }
    const canvasHeight = div.clientHeight;
    const canvasWidth = div.clientWidth;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(canvasWidth, canvasHeight, false);
    // const ratio = canvasWidth / canvasHeight;
    // div.appendChild(this.renderer.domElement);

    this.animate();
  }

  createMainFacets(): void {
    // it's math: the projection of the champer on the plane is champer / sqrt(2)
    // (Pythagoras), reduce from both side and you get:
    const width = 1.0 - Math.sqrt(2) * (this.styles.navCube.chamfer ?? 0);
    const plane = new THREE.PlaneGeometry(width, width).translate(0, 0, 0.5);
    const halfPi = Math.PI / 2;
    const geoms = [];

    geoms[Sides.Front] = plane.clone().rotateX(halfPi);
    geoms[Sides.Back] = plane.clone().rotateX(-halfPi).rotateY(Math.PI);
    geoms[Sides.Left] = plane.clone().rotateY(-halfPi).rotateX(halfPi);
    geoms[Sides.Right] = plane.clone().rotateY(halfPi).rotateX(halfPi);
    geoms[Sides.Top] = plane.clone();
    geoms[Sides.Bottom] = plane.clone().rotateX(-Math.PI);

    geoms.forEach((geom, i) => {
      const mesh = new THREE.Mesh(geom, new THREE.MeshBasicMaterial());
      mesh.userData.sides = i;
      this._cubeMesh?.add(mesh);
    });
  }

  createEdgeFacets(): void {
    // it's math: the projection of the champer on the plane is champer / sqrt(2)
    // (Pythagoras), reduce from both side and you get:
    const width = this.chamfer;
    const height = 1.0 - Math.sqrt(2) * this.chamfer;
    const plane = new THREE.PlaneGeometry(width, height);
    const piBy2 = Math.PI / 2;
    const piBy4 = Math.PI / 4;
    const geoms = [];
    const offset: number = Math.sqrt(2) / 2 - this.chamfer / 2;
    plane.translate(0, 0, offset);

    // side edges
    geoms[Sides.Front | Sides.Right] = plane
      .clone()
      .rotateX(piBy2)
      .rotateZ(piBy4);
    geoms[Sides.Right | Sides.Back] = geoms[Sides.Front | Sides.Right]
      .clone()
      .rotateZ(piBy2);
    geoms[Sides.Back | Sides.Left] = geoms[Sides.Right | Sides.Back]
      .clone()
      .rotateZ(piBy2);
    geoms[Sides.Left | Sides.Front] = geoms[Sides.Back | Sides.Left]
      .clone()
      .rotateZ(piBy2);

    // top edges
    geoms[Sides.Top | Sides.Right] = plane.clone().rotateY(piBy4);
    geoms[Sides.Top | Sides.Back] = geoms[Sides.Top | Sides.Right]
      .clone()
      .rotateZ(piBy2);
    geoms[Sides.Top | Sides.Left] = geoms[Sides.Top | Sides.Back]
      .clone()
      .rotateZ(piBy2);
    geoms[Sides.Top | Sides.Front] = geoms[Sides.Top | Sides.Left]
      .clone()
      .rotateZ(piBy2);

    // botom edges
    geoms[Sides.Bottom | Sides.Right] = plane.clone().rotateY(piBy4 + piBy2);
    geoms[Sides.Bottom | Sides.Back] = geoms[Sides.Bottom | Sides.Right]
      .clone()
      .rotateZ(piBy2);
    geoms[Sides.Bottom | Sides.Left] = geoms[Sides.Bottom | Sides.Back]
      .clone()
      .rotateZ(piBy2);
    geoms[Sides.Bottom | Sides.Front] = geoms[Sides.Bottom | Sides.Left]
      .clone()
      .rotateZ(piBy2);

    geoms.forEach((geom, i) => {
      const color = this.getEdgeColor(i);
      const sideMat = new THREE.MeshBasicMaterial({ color });
      const mesh = new THREE.Mesh(geom, sideMat);
      mesh.userData.sides = i;
      this._cubeMesh.add(mesh);

      // create wireframe
      const border = new THREE.Geometry();
      border.vertices.push(geom.vertices[0]);
      border.vertices.push(geom.vertices[1]);
      border.vertices.push(geom.vertices[3]);
      border.vertices.push(geom.vertices[2]);
      border.vertices.push(geom.vertices[0]);

      const lineMat = new THREE.LineBasicMaterial({ color: 'black' }); // TODO make param
      const line = new THREE.Line(border, lineMat);
      mesh.add(line); // the hierarchy is important for ray casting
    });
  }

  getClosesVertexOfPlaneMesh(mesh: THREE.Mesh, vec: Vector3): Vector3 {
    const geom: THREE.PlaneGeometry = mesh.geometry as THREE.PlaneGeometry;
    let closest: Vector3 = geom.vertices[0];
    let bestDist = closest.distanceTo(vec);
    for (let i = 1; i < geom.vertices.length; i++) {
      const dist = geom.vertices[i].distanceTo(vec);
      if (dist < bestDist) {
        bestDist = dist;
        closest = geom.vertices[i];
      }
    }
    return closest;
  }

  getMeshOfSide(side: Sides): THREE.Mesh {
    return this._cubeMesh.children.find(
      (m) => m.userData.sides == side
    ) as THREE.Mesh;
  }

  getTriangleOfSides(
    a: Sides,
    b: Sides,
    c: Sides,
    corner: Vector3
  ): THREE.Triangle {
    return new THREE.Triangle(
      this.getClosesVertexOfPlaneMesh(this.getMeshOfSide(a), corner),
      this.getClosesVertexOfPlaneMesh(this.getMeshOfSide(b), corner),
      this.getClosesVertexOfPlaneMesh(this.getMeshOfSide(c), corner)
    );
  }

  createCornerMesh(a: Sides, b: Sides, c: Sides, corner: Vector3): THREE.Mesh {
    const geom = new THREE.Geometry();
    const triangle = this.getTriangleOfSides(a, b, c, corner);
    geom.vertices.push(triangle.a);
    geom.vertices.push(triangle.b);
    geom.vertices.push(triangle.c);
    geom.faces.push(new THREE.Face3(0, 1, 2));
    const color = new THREE.Color(this.styles.navCube.cornerColor);
    const mat = new THREE.MeshBasicMaterial({ color });
    geom.computeFaceNormals();
    const mesh = new THREE.Mesh(geom, mat);
    mesh.userData.sides = a | b | c;
    this.log.verbose('corner', a, b, c, corner, geom, triangle, mesh);
    return mesh;
  }

  createCornerFacets(): void {
    this._cubeMesh.add(
      this.createCornerMesh(
        Sides.Left,
        Sides.Front,
        Sides.Top,
        new Vector3(-1, -1, 1)
      )
    );
    this._cubeMesh.add(
      this.createCornerMesh(
        Sides.Front,
        Sides.Right,
        Sides.Top,
        new Vector3(1, -1, 1)
      )
    );
    this._cubeMesh.add(
      this.createCornerMesh(
        Sides.Right,
        Sides.Back,
        Sides.Top,
        new Vector3(1, 1, 1)
      )
    );
    this._cubeMesh.add(
      this.createCornerMesh(
        Sides.Back,
        Sides.Left,
        Sides.Top,
        new Vector3(-1, 1, 1)
      )
    );

    this._cubeMesh.add(
      this.createCornerMesh(
        Sides.Front,
        Sides.Left,
        Sides.Bottom,
        new Vector3(-1, -1, -1)
      )
    );
    this._cubeMesh.add(
      this.createCornerMesh(
        Sides.Right,
        Sides.Front,
        Sides.Bottom,
        new Vector3(1, -1, -1)
      )
    );
    this._cubeMesh.add(
      this.createCornerMesh(
        Sides.Back,
        Sides.Right,
        Sides.Bottom,
        new Vector3(1, 1, -1)
      )
    );
    this._cubeMesh.add(
      this.createCornerMesh(
        Sides.Left,
        Sides.Back,
        Sides.Bottom,
        new Vector3(-1, 1, -1)
      )
    );
  }

  animate(): void {
    requestAnimationFrame( this.animate.bind(this) );
    this.renderer.render(this.scene, this.localCamera);
  }

  createLabels(): void {
    const sides = [
      Sides.Front,
      Sides.Back,
      Sides.Left,
      Sides.Right,
      Sides.Top,
      Sides.Bottom,
    ];
    const canvasSize = 256; // textures need 2^N, N=7
    let fontSize = 72;

    {
      // find common font size
      const longestString = Sides[Sides.Bottom];
      const canvas = document.createElement('canvas');
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.font = `bold ${fontSize}px Arial`;
        const pixels = ctx.measureText(longestString);
        const ratio = canvasSize / pixels.width;
        fontSize = Math.round(fontSize * ratio * 0.9); // 90% for padding
      }
    }

    for (let i=0; i<sides.length; i++) {
      const side = sides[i];
      const str = Sides[side];

      const canvas = document.createElement('canvas');
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        this.log.warn('No 2D context for label.');
        continue;
      }
      const colHex = this.getFaceColor(side).getHexString();
      ctx.fillStyle = '#' + colHex;
      this.log.debug('fill', ctx.fillStyle, colHex, this.getSideColor(side));
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#222222';
      ctx.fillText(str, canvas.width / 2, canvas.height / 2);

      const mesh = this.getMeshOfSide(side);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.map = new THREE.CanvasTexture(canvas);
    }
  }

  private fadeFace(col: THREE.Color): THREE.Color {
    return col.lerp(new THREE.Color('#FFFFFF'), 0.5);
  }

  private getFaceColor(side: Sides): THREE.Color {
    return this.fadeFace(new THREE.Color(this.getSideColor(side)));
  }

  private getEdgeColor(side: Sides): THREE.Color {
    let col: THREE.Color | undefined = undefined;
    allSides.forEach(s => {
      const snum = s as number;
      if (snum === undefined) return;
      // if (typeof s !== 'number') return;
      if ((side & snum) === 0) {
        this.log.debug('side', snum, 'vs', side);
        const scol = new THREE.Color(this.getSideColor(snum));
        col = col?.lerp(scol, 0.5) ?? scol;
      }
    });
    this.log.debug('final side', col);
    const def = new THREE.Color('#FFFFFF');
    if (!col) return def;
    return this.fadeFace(col);
  }

  private getSideColor(side: Sides): string {
    if (side === Sides.Top || side === Sides.Bottom) return this.styles.renderGroups[RenderGroupType.Z].color;
    if (side === Sides.Left || side === Sides.Right) return this.styles.renderGroups[RenderGroupType.X].color;
    if (side === Sides.Back || side === Sides.Front) return this.styles.renderGroups[RenderGroupType.Y].color;
    return '#444444';
  }

  private onClick(event: MouseEvent): void {
    if (this._cubeMesh) {
      const size = new THREE.Vector2();
      this.renderer.getSize(size);
      const xy = {
        x: +(event.offsetX / size.width) * 2 - 1,
        y: -(event.offsetY / size.height) * 2 + 1,
      };
      const ray = new THREE.Raycaster();
      ray.setFromCamera(xy, this.localCamera);
      const intersects = ray.intersectObjects(this._cubeMesh.children, false);
      this.log.debug('click intersects', intersects, this._cubeMesh);
      intersects.forEach((intersection, i) => {
        if (intersection.object.userData.sides && intersection.face?.normal) {
          this.onSideClicked(
            intersection.object as THREE.Mesh,
            intersection.face?.normal
          );
          return;
        }
      });
    }
  }

  private onSideClicked(mesh: THREE.Mesh, normal: Vector3): void {
    this.log.debug('side', mesh, 'normal', normal);
    const camLen = this.trackedCamera.position.length();
    if (normal.equals(this.trackedCamera.up)) {
      normal.applyAxisAngle(new Vector3(1, 0, 0), 0.001);
    }

    this.trackedCamera.position.copy(normal).multiplyScalar(camLen);
    this.trackedCamera.lookAt(0, 0, 0);
  }
}

export default NavCube;
