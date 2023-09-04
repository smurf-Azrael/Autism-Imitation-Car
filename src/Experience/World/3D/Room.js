import * as THREE from 'three'
import Experience from '../../Experience.js'

export default class Room
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        // Resource
        this.resource = this.resources.items.room;

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene;
        this.scene.add(this.model);
    }
}