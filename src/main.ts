import * as THREE from 'three';
import {throttle} from 'lodash';

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
            color_scheme: {type: "int", value: props.color_scheme},
            a: {type:'float', value: props.a},
            b: {type:'float', value: props.b},
            c: {type:'float', value: props.c},
            d: {type:'float', value: props.d},
            e: {type:'float', value: props.e},
            f: {type:'float', value: props.f},
        };

        this.render = throttle(this.render.bind(this), 20);

        this.setupScene();

        this.scroll = this.scroll.bind(this);
        this.subscribeEvents();
        this.attachToDOM();
        this.render();
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.createMesh();
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

    /// ================ EVENTS ================

    scroll(event){
        const zoom_0 = this.zoom;

        // chrome vs. firefox
        if ("wheelDeltaY" in event){  // chrome vs. firefox
            this.zoom *= 1 - event.wheelDeltaY*0.0003;
        } else{
            this.zoom *= 1 + event.deltaY*0.01;
        }
        
        const space = this.zoom - zoom_0;
        const mouseX = event.clientX / window.innerWidth;
        const mouseY = 1-event.clientY / window.innerHeight;
        this.offset = this.offset.add(new THREE.Vector2(-mouseX * space * this.aspect, -mouseY * space));
        
        this.uniforms.zoom.value = this.zoom;
        this.uniforms.offset.value = this.offset;

        this.render();
    }

    subscribeEvents() {
        document.addEventListener('wheel', this.scroll);
    }

    /// ======== UPDATING AND RENDERING ========

    update(params) {
        this.uniforms.a.value = params[0];
        this.uniforms.b.value = params[1];
        this.uniforms.c.value = params[2];
        this.uniforms.d.value = params[3];
        this.uniforms.e.value = params[4];
        this.uniforms.f.value = params[5];
    }

    updateColors(color_scheme: number) {
        this.uniforms.color_scheme.value = color_scheme;
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}