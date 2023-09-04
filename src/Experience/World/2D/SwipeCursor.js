import * as THREE from 'three';
import Experience from '../../Experience.js';
import gsap from 'gsap';

export default class Cursor
{
    constructor()
    {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setGeometry();
        this.setTextures();
        this.setMaterial();
        this.setMesh();
    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(1, 2.5);
    }

    setTextures()
    {
        this.textures = {};

        this.textures.color = this.resources.items.swipeCursor;
        this.textures.color.encoding = THREE.SRGBColorSpace;
        this.textures.color.repeat.set(1.5, 1.5);
        this.textures.color.wrapS = THREE.RepeatWrapping;
        this.textures.color.wrapT = THREE.RepeatWrapping;

        this.textures.normal = this.resources.items.swipeCursor;
        this.textures.normal.repeat.set(1, 1);
        this.textures.normal.wrapS = THREE.RepeatWrapping;
        this.textures.normal.wrapT = THREE.RepeatWrapping;
    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color,
            normalMap: this.textures.normal,
            transparent: true,
            opacity: 0,
        });
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.scale.set(0.25, 0.2, 1);
        this.mesh.position.set(0.7, 2, 2.5);
        this.mesh.rotation.z = 0.2;
        this.scene.add(this.mesh);
    }

    show()
    {
        gsap.to(this.material, {
            opacity: 1,
            duration: 0.5
        });
    }

    animate()
    {
        gsap.to(this.mesh.position, {
            x: 1.7,
            duration: 1.5,
            delay: 1,
            repeat: -1,
            repeatDelay: 0.5,
        })
    }

    hide()
    {
        gsap.to(this.material, {
            opacity: 0,
            duration: 0.5,
        });
    }
}