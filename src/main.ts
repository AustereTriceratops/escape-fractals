import * as THREE from 'three';

export default class Main {
    props;

    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    renderer: THREE.WebGLRenderer;
    gridHighlights: THREE.Group;
    
    constructor(props) {
        this.props = props;
        const val = this.props.value;
        //this.props.setInstance(this);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(val, val, val);
        this.camera = new THREE.OrthographicCamera(0, 9, 0, 9, -1, 1);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(3)
        this.renderer.setClearColor( 0xffffff );

        this.attachToDOM();
        this.render();
    }

    attachToDOM() {
        const element = document.getElementById("canvas");

        if (element) {
            element.appendChild(this.renderer.domElement);
        }
        else {
            console.log("uh oh");
        }
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}