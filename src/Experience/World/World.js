import Experience from '../Experience.js';
import Environment from './Environment.js';
import Character_L from './3D/Character_L.js';
import Character_R from './3D/Character_R.js';
import Car_L from './3D/Car_L.js';
import Car_R from './3D/Car_R.js';
import Room from './3D/Room.js';
import Cursor from './2D/SwipeCursor.js';
import Instruct from './Audio/Instruct.js';

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // Wait for resources
        this.resources.on('ready', () => {
            // Setup
            this.character_L = new Character_L();
            this.character_R = new Character_R();
            this.car_L = new Car_L();
            this.car_R = new Car_R();
            this.room = new Room();
            this.cursor = new Cursor();
            this.instruct = new Instruct();
            this.environment = new Environment();
        });
    }

    update() {
        if (this.character_L)
            this.character_L.update();
        if (this.character_R)
            this.character_R.update();
        if (this.car_L)
            this.car_L.update();
        if (this.car_R)
            this.car_R.update();
    }
}