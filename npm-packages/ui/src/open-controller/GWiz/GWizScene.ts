import * as THREE from 'three';
import {IVisualizeGCode, IVisualizerPreferences} from './types';

//
// React.useEffect(() => {
//   log.debug('eff');
//
//   document.body.appendChild( renderer.domElement );
//
//
//   const scene = new THREE.Scene();
//   const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
//   const geometry = new THREE.BoxGeometry( 1, 1, 1 );
//   const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//   const cube = new THREE.Mesh( geometry, material );
//   scene.add( cube );
//   camera.position.z = 5;
//   const animate = function () {
//     requestAnimationFrame( animate );
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
//     renderer.render( scene, camera );
//   };
//   animate();
// });

class GWizScene {
  public prefs: IVisualizerPreferences;
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public canvas: HTMLCanvasElement | undefined;
  public targetId: string;

  constructor(viz: IVisualizeGCode) {
    this.prefs = viz.preferences;
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(this.backgroundColor);
    this.canvas = viz.canvas;
    this.targetId = '';// viz.targetId;
    // this.targetId = opts.targetId;
    // // this.endLayer = opts.limit;
    // this.endLayer = opts.endLayer;
    // this.startLayer = opts.startLayer;
    // this.topLayerColor = opts.topLayerColor;
    // this.lastSegmentColor = opts.lastSegmentColor;
    // this.lineWidth = opts.lineWidth;
    //
    // console.debug('opts', opts);

    if (!this.canvas && !this.targetId) {
      throw Error('Set either opts.canvas or opts.targetId');
    }

    if (!this.canvas) {
      const container = document.getElementById(this.targetId);
      if (!container)
        throw new Error('Unable to find element ' + this.targetId);

      this.renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
      this.canvas = this.renderer.domElement;

      container.appendChild( this.canvas );
    }
    else {
      this.renderer = new THREE.WebGLRenderer( {
        canvas: this.canvas,
        preserveDrawingBuffer: true
      });
    }

    this.camera = new THREE.PerspectiveCamera( 75, this.canvas.offsetWidth/this.canvas.offsetHeight, 10, 5000 );
    this.camera.position.set( 0, 0, 50 );
    const fogFar = (this.camera ).far;
    const fogNear = fogFar * 0.8;
    // this.scene.fog = new THREE.Fog( this.scene.background, fogNear, fogFar);

    this.resize();


    // const controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    const [w, h] = [this.canvas.offsetWidth, this.canvas.offsetHeight];
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(w, h, false);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }
}
