import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.debug = this.experience.debug;

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('environment');
        }

        this.setSunLight();
    }

    setSunLight() {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(this.ambientLight);

        this.lampLight = new THREE.PointLight(0xffffff, 50, 30, 2);
        this.lampLight.position.set(0.3, 8, 2);
        this.scene.add(this.lampLight);

        // Debug
        if (this.debug.active) {
            this.debugFolder
                .add(this.ambientLight, 'intensity')
                .name('sunLightIntensity')
                .min(0)
                .max(10)
                .step(0.001);
        }
    }
}