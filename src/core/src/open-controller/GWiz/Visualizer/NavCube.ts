import * as THREE from 'three';
import {Vector3} from 'three';
import GWizCanvas from './GWizCanvas';
import GWizCamera from './GWizCamera';
import {Logger} from '../../../utils/logging';
import {IVisualizerStyles, ViewSide} from '../types';
import {getSidesColor} from '../sides';

//https://github.com/yoavmil/angular-threejs-starter/blob/nav-cube/src/app/nav-cube/nav-cube.ts


class NavCube {
  styles: IVisualizerStyles;
  canvas: GWizCanvas;
  renderer: THREE.WebGLRenderer;
  localCamera: GWizCamera;
  scene: THREE.Scene;

  private _cubeMesh: THREE.Mesh;
  //private _northStar: THREE.Mesh;
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

    //const geometry = new THREE.ConeGeometry(0.2, 0.5);
    //const material = new THREE.MeshBasicMaterial(this.styles.renderGroups[RenderGroupType.P]);
    //geometry.rotateX(-Math.PI/2);
    //geometry.translate(0, 0, 0.5 / 2); // Tip of cone = origin

    //this._northStar = new THREE.Mesh( geometry, material );

    this.scene = new THREE.Scene();
    this.scene.add(this._cubeMesh);

    this.localCamera = new GWizCamera(this.canvas);
    // this.localCamera.up = this.camera.up.clone();
    this.localCamera.setRange( 0.01, this._range);
    this.localCamera.position.copy(new Vector3(0, 5, 0));
    this.localCamera.lookAt(0, 0, 0);
  }

  update(): void {
    // const distanceMult = this._range * 0.5;
    // this.localCamera.position.copy( cameraNormal.multiplyScalar(distanceMult) );
    // this.localCamera.lookAt(0, 0, 0);


    //this._cubeMesh.position.copy(this.canvas.center);
    //this._northStar.position.copy(lookNormal).multiplyScalar(this._range * (1 - this._zoom) * 0.5);

    const vector: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    this.trackedCamera.getWorldDirection(vector);
    // const theta = Math.atan2(vector.x,vector.z);

    this.localCamera.position.copy(vector).multiplyScalar(this._range * (1 - this._zoom) * -1);
    this.localCamera.lookAt(new THREE.Vector3(0, 0, 0));

    // this.log.debug('camera', this.localCamera.position, 'center', this._cubeMesh.position);
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
    const dpi = window.devicePixelRatio;
    this.renderer.setPixelRatio(dpi);
    this.renderer.setSize(canvasWidth / dpi, canvasHeight / dpi, false);
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

    geoms[ViewSide.Front] = plane.clone().rotateX(halfPi);
    geoms[ViewSide.Back] = plane.clone().rotateX(-halfPi).rotateY(Math.PI);
    geoms[ViewSide.Left] = plane.clone().rotateY(-halfPi).rotateX(halfPi);
    geoms[ViewSide.Right] = plane.clone().rotateY(halfPi).rotateX(halfPi);
    geoms[ViewSide.Top] = plane.clone();
    geoms[ViewSide.Bottom] = plane.clone().rotateX(-Math.PI);

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
    geoms[ViewSide.Front | ViewSide.Right] = plane
      .clone()
      .rotateX(piBy2)
      .rotateZ(piBy4);
    geoms[ViewSide.Right | ViewSide.Back] = geoms[ViewSide.Front | ViewSide.Right]
      .clone()
      .rotateZ(piBy2);
    geoms[ViewSide.Back | ViewSide.Left] = geoms[ViewSide.Right | ViewSide.Back]
      .clone()
      .rotateZ(piBy2);
    geoms[ViewSide.Left | ViewSide.Front] = geoms[ViewSide.Back | ViewSide.Left]
      .clone()
      .rotateZ(piBy2);

    // top edges
    geoms[ViewSide.Top | ViewSide.Right] = plane.clone().rotateY(piBy4);
    geoms[ViewSide.Top | ViewSide.Back] = geoms[ViewSide.Top | ViewSide.Right]
      .clone()
      .rotateZ(piBy2);
    geoms[ViewSide.Top | ViewSide.Left] = geoms[ViewSide.Top | ViewSide.Back]
      .clone()
      .rotateZ(piBy2);
    geoms[ViewSide.Top | ViewSide.Front] = geoms[ViewSide.Top | ViewSide.Left]
      .clone()
      .rotateZ(piBy2);

    // botom edges
    geoms[ViewSide.Bottom | ViewSide.Right] = plane.clone().rotateY(piBy4 + piBy2);
    geoms[ViewSide.Bottom | ViewSide.Back] = geoms[ViewSide.Bottom | ViewSide.Right]
      .clone()
      .rotateZ(piBy2);
    geoms[ViewSide.Bottom | ViewSide.Left] = geoms[ViewSide.Bottom | ViewSide.Back]
      .clone()
      .rotateZ(piBy2);
    geoms[ViewSide.Bottom | ViewSide.Front] = geoms[ViewSide.Bottom | ViewSide.Left]
      .clone()
      .rotateZ(piBy2);

    geoms.forEach((geom, i) => {
      const color = getSidesColor(i, this.styles);
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

  getMeshOfSide(side: ViewSide): THREE.Mesh {
    return this._cubeMesh.children.find(
      (m) => m.userData.sides == side
    ) as THREE.Mesh;
  }

  getTriangleOfSides(
    a: ViewSide,
    b: ViewSide,
    c: ViewSide,
    corner: Vector3
  ): THREE.Triangle {
    return new THREE.Triangle(
      this.getClosesVertexOfPlaneMesh(this.getMeshOfSide(a), corner),
      this.getClosesVertexOfPlaneMesh(this.getMeshOfSide(b), corner),
      this.getClosesVertexOfPlaneMesh(this.getMeshOfSide(c), corner)
    );
  }

  createCornerMesh(a: ViewSide, b: ViewSide, c: ViewSide, corner: Vector3): THREE.Mesh {
    const geom = new THREE.Geometry();
    const triangle = this.getTriangleOfSides(a, b, c, corner);
    geom.vertices.push(triangle.a);
    geom.vertices.push(triangle.b);
    geom.vertices.push(triangle.c);
    geom.faces.push(new THREE.Face3(0, 1, 2));
    const color = getSidesColor(a | b | c, this.styles);
    const mat = new THREE.MeshBasicMaterial({ color });
    geom.computeFaceNormals();
    const mesh = new THREE.Mesh(geom, mat);
    mesh.userData.sides = a | b | c;
    return mesh;
  }

  createCornerFacets(): void {
    this._cubeMesh.add(
      this.createCornerMesh(
        ViewSide.Left,
        ViewSide.Front,
        ViewSide.Top,
        new Vector3(-1, -1, 1)
      )
    );
    this._cubeMesh.add(
      this.createCornerMesh(
        ViewSide.Front,
        ViewSide.Right,
        ViewSide.Top,
        new Vector3(1, -1, 1)
      )
    );
    this._cubeMesh.add(
      this.createCornerMesh(
        ViewSide.Right,
        ViewSide.Back,
        ViewSide.Top,
        new Vector3(1, 1, 1)
      )
    );
    this._cubeMesh.add(
      this.createCornerMesh(
        ViewSide.Back,
        ViewSide.Left,
        ViewSide.Top,
        new Vector3(-1, 1, 1)
      )
    );

    this._cubeMesh.add(
      this.createCornerMesh(
        ViewSide.Front,
        ViewSide.Left,
        ViewSide.Bottom,
        new Vector3(-1, -1, -1)
      )
    );
    this._cubeMesh.add(
      this.createCornerMesh(
        ViewSide.Right,
        ViewSide.Front,
        ViewSide.Bottom,
        new Vector3(1, -1, -1)
      )
    );
    this._cubeMesh.add(
      this.createCornerMesh(
        ViewSide.Back,
        ViewSide.Right,
        ViewSide.Bottom,
        new Vector3(1, 1, -1)
      )
    );
    this._cubeMesh.add(
      this.createCornerMesh(
        ViewSide.Left,
        ViewSide.Back,
        ViewSide.Bottom,
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
      ViewSide.Front,
      ViewSide.Back,
      ViewSide.Left,
      ViewSide.Right,
      ViewSide.Top,
      ViewSide.Bottom,
    ];
    const canvasSize = 256; // textures need 2^N, N=7
    let fontSize = 72;

    {
      // find common font size
      const longestString = ViewSide[ViewSide.Bottom];
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
      const str = ViewSide[side];

      const canvas = document.createElement('canvas');
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        this.log.warn('No 2D context for label.');
        continue;
      }
      const colHex = getSidesColor(side, this.styles).getHexString();
      ctx.fillStyle = '#' + colHex;
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

  private onClick(event: MouseEvent): void {
    if (this._cubeMesh) {
      const size = new THREE.Vector2();
      this.renderer.getSize(size);
      const mult = window.devicePixelRatio / 2;
      const xy = {
        x: +(event.offsetX / size.width) * mult - 1,
        y: -(event.offsetY / size.height) * mult + 1,
      };
      const ray = new THREE.Raycaster();
      ray.setFromCamera(xy, this.localCamera);
      const intersects = ray.intersectObjects(this._cubeMesh.children, false);
      intersects.forEach((intersection) => {
        if (intersection.object.userData.sides && intersection.face?.normal) {
          this.onSideClicked(
            intersection.object.userData.sides
          );
          return;
        }
      });
    }
  }

  private onSideClicked(sides: ViewSide): void {
    // const camLen = this.trackedCamera.position.length();
    //if (normal.equals(this.trackedCamera.up)) {
    //  normal.applyAxisAngle(new Vector3(1, 0, 0), 0.001);
    //}

    //this.trackedCamera.position.copy(normal).multiplyScalar(camLen);
    this.trackedCamera.lookAtSides(sides);
    // this.log.debug(sides, 'side', mesh, 'normal', normal);
  }
}

export default NavCube;
