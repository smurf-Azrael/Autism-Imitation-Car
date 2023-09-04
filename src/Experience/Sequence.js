import Experience from "./Experience";

export default class Sequence {

    constructor() {
        this.experience = new Experience();
        this.resources = this.experience.resources;

        this.lock_L = true;
        this.lock_R = false;
        this.cursor = false;

        this.resources.on('ready', () => {
            setTimeout(() => {
                this.demonstrate();
            }, 5000);
        });
    }

    demonstrate() {
        this.lock_L = true;
        this.experience.world.instruct.playSound();
        this.character_L = this.experience.world.character_L.animation.play('push');
        this.car_L = this.experience.world.car_L.animation.play('push');

        this.experience.world.car_L.animation.mixer.addEventListener('finished', (event) => {
            setTimeout(() => {
                this.experience.world.cursor.show();
                if (!this.cursor) {
                    this.experience.world.cursor.animate();
                    this.cursor = true;
                }
                this.lock_L = false;
                this.imitate();
            }, 2000);
        });

        this.experience.world.character_L.animation.mixer.addEventListener('finished', (e) => {
            if (e.action._clip.name == "Character_L_Push") {
                this.experience.world.character_L.animation.play('idle');
                this.experience.world.car_L.animation.play('idle');
            }
        });
    }

    imitate() {

        window.addEventListener("mousedown", (event) => {
            this.initPose = event.clientX
        });
        window.addEventListener("touchstart", (event) => {
            this.initPose = event.changedTouches[0].clientX;
        });
        window.addEventListener("mousemove", (event) => {
            if (event.buttons == 1) {
                this.finalPose = event.clientX;
            }
        });
        window.addEventListener("touchmove", (event) => {
            this.finalPose = event.changedTouches[0].clientX;
        });
        window.addEventListener("mouseup", (event) => {
            if (this.finalPose - this.initPose >= 10) {
                if (!this.lock_L)
                    this.run();
                this.finalPose = 0;
            }
        });
        window.addEventListener("touchend", (event) => {
            if (this.finalPose - this.initPose >= 10) {
                if (!this.lock_L)
                    this.run();
                this.finalPose = 0;
            }
        });

        this.run = () => {
            this.experience.world.cursor.hide();
            this.experience.world.character_R.animation.play('push');
            this.experience.world.car_R.animation.play('push');

            this.experience.world.character_R.animation.mixer.addEventListener('finished', (e) => {
                if (e.action._clip.name == "Character_R_Push") {
                    setTimeout(() => {
                        this.experience.world.character_R.animation.play('idle');
                        this.experience.world.car_R.animation.play('idle');
                        setTimeout(() => {
                            this.demonstrate();
                        }, 2000);
                    }, 1000);
                }
            });
        }

    }
}