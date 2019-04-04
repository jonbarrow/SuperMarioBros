/**
 * Essentially the same thing as the `Player` class, just minus the socket connection
 * @param {*} x player spawn x
 * @param {*} y player spawn y
 * @param {*} name player name
 */

class Entity {
    constructor(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;

        this.initialize();
    }

    initialize() {
        this.entity = createSprite(this.x, this.y, 32, 32);
        this.entity.depth = 2;

        if (debug_mode) this.entity.debug = true;

        this.selectType();
    }

    selectType() {
        switch (this.type) {
            case 'goomba':
                this.entity.addAnimation('walking', goomba);
                this.entity.addAnimation('dead', goomba_dead);
                this.entity.direction = 'left';
                this.finalize();
                break;
        
            default:
                break;
        }
    }

    finalize() {
        this.entity.addToGroup(enemies);
        this.startAI();
    }

    startAI() {
        switch (this.type) {
            case 'goomba':
                setInterval(function() {
                    this.entity.velocity.y += gravity;
                    if (this.entity.direction == 'right') {
                        this.entity.velocity.x = 1;
                    } else {
                        this.entity.velocity.x = -1;
                    }
                    if (this.entity.getAnimationLabel() == 'dead' || !do_physics) {
                        this.entity.velocity.x = 0;
                    }
                }.bind(this), 1000/30)
                break;
        
            default:
                break;
        }
    }
    
}