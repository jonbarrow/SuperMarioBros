class Player {

    constructor(x, y) {
        this.position = {};
        this.position.x = x;
        this.position.y = y;

        this.score = 0;

        this.speed = 3;
        this.friction = 0;
        this.gravity = 1;
        this.jump_height = 18;

        this.on_ground = true;
        this.is_walking = false;
        this.is_jumping = false;
        this.is_super = false;
        this.has_firepower = false;
        this.has_starpower = false;

        this.direction = 'right';


        this.initialize();
    }

    initialize() {
        this.sprite = createSprite(this.position.x, this.position.y);

        this.sprite.addAnimation('walking_small', player_walking_small);
        this.sprite.addAnimation('walking_super', player_walking_super);
        
        this.sprite.addAnimation('idle_small', player_idle_small);
        this.sprite.addAnimation('jumping_small', player_jumping_small);

        this.sprite.addAnimation('idle_super', player_idle_super);
        this.sprite.addAnimation('jumping_super', player_jumping_super);

        this.sprite.addAnimation('grow', player_grow);

        this.position.x = this.sprite.position.x;
        this.position.y = this.sprite.position.y;
        this.position.direction = this.direction;
        this.position.is_attacking = this.is_attacking;
    }

    collide(collider, callback) {
    	this.sprite.collide(collider, callback);
    }

    overlap(collider, callback) {
    	this.sprite.overlap(collider, callback);
    }

    jump() {
        if (!this.is_jumping) {
            this.sprite.velocity.y -= this.jump_height;
            this.on_ground = false;
            this.is_jumping = true;
            if (this.is_super) {
                this.changeAnimation('jumping_super');
                sounds.effects.jump_super.play();
            } else {
                this.changeAnimation('jumping_small');
                sounds.effects.jump_small.play();
            }
        }
    }

    crouch() {
    }

    moveRight() {
        this.sprite.mirrorX(1);
        this.sprite.velocity.x = this.speed;
    }

    moveLeft() {
        this.sprite.mirrorX(-1);
    	if (this.position.x > -((width/2)-20)) {
    		this.sprite.velocity.x = -this.speed;
    	} else {
    		this.sprite.velocity.x = 0;
    	}
    }

    idle() {
        if (this.is_super && this.on_ground) {
            this.changeAnimation('idle_super');
        } else if (this.on_ground) {
            this.changeAnimation('idle_small');
        }
    	this.sprite.velocity.x = 0;
    }

    getSpeed() {
        return this.speed;
    }

    getDirection() {
        return this.direction;
    }

    getPosition() {
        return this.position;
    }

    changeAnimation(animation) {
        this.sprite.changeAnimation(animation);
    }

    addSpeed(speed, rotation) {
        this.sprite.addSpeed(speed, rotation);
    }

    setSpeed(speed, rotation=0) {
        this.sprite.setSpeed(speed, rotation);
    }

    addToGroup(group) {
        this.sprite.addToGroup(group);
    }

    remove() {
        this.sprite.remove();
    }

    update_position() {
        this.position.x = this.sprite.position.x;
        this.position.y = this.sprite.position.y;
        this.position.direction = this.direction;

        if (do_physics) this.sprite.velocity.y += this.gravity;
    }
}