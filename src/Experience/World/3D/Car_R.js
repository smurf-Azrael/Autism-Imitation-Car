import * as THREE from 'three';
import Experience from '../../Experience.js';

export default class Car_R {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.debug = this.experience.debug;

        this.mouse = new THREE.Vector2();
        this.initPose = 0;
        this.finalPose = 0;

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('car_R');
        }

        // Resource
        this.resource = this.resources.items.car_R;

        this.setModel();
        this.setAnimation();
    }

    setModel() {
        this.model = this.resource.scene;
        // this.model.position.set(3.6, 0, 0);
        this.scene.add(this.model);
    }

    setAnimation() {
        this.animation = {}

        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.model)

        // Actions
        this.animation.actions = {}

        this.animation.actions.idle = this.animation.mixer.clipAction(THREE.AnimationClip.findByName(this.resource.animations, "Car_R_Idle"));
        this.animation.actions.push = this.animation.mixer.clipAction(THREE.AnimationClip.findByName(this.resource.animations, "Car_R_push"));
        this.animation.actions.push.setLoop(THREE.LoopOnce);
        this.animation.actions.push.clampWhenFinished = true;

        this.animation.actions.current = this.animation.actions.idle;
        this.animation.actions.current.play();

        // Play the action
        this.animation.play = (name) => {
            const newAction = this.animation.actions[name];
            const oldAction = this.animation.actions.current;

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 0.2);

            this.animation.actions.current = newAction;
        }
    }

    update() {
        this.animation.mixer.update(this.time.delta);
    }
}