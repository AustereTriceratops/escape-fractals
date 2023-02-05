import * as THREE from 'three';

import { FRAGMENT_SHADER } from './shader'

export default class Main {
    props;
    uniforms;

    aspect = window.innerWidth / window.innerHeight;
    zoom = 4.0;
    offset = new THREE.Vector2(-2.0*this.aspect, -2.0);

    
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    renderer: THREE.WebGLRenderer;
    gridHighlights: THREE.Group;
    
    constructor(props) {
        this.props = props;

        this.uniforms = {
            res: {type: 'vec2', value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
            aspect: {type: 'float', value: this.aspect},
            zoom: {type:'float', value: this.zoom},
            offset: {type:'vec2', value: this.offset},
            a: {type:'float', value: props.value},
        };

        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.createMesh();

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

    createMesh() {
        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader: FRAGMENT_SHADER,
        });

        const mesh = new THREE.Mesh(geometry, material);
        
        this.scene.add(mesh);
    }

    /// ======== UPDATING AND RENDERING ========

    update(val) {
        this.uniforms.a.value = val;
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}