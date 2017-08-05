class Player {

    constructor(x, y) {
        this.position = {};
        this.position.x = x;
        this.position.y = y;

        this.score = 0;

        this.speed = 3;
        this.gravity = 1;
        this.jump_height = 20;

        this.on_ground = true;
        this.is_walking = false;
        this.is_jumping = false;
        this.is_super = true;
        this.has_starpower = false;

        this.direction = 'right';

        this.idle_small = player_idle_small;
        this.jumping_small = player_jumping_small;

        this.idle_super = player_idle_super;
        this.jumping_super = player_jumping_super;

        this.initialize();
    }

    initialize() {
        this.sprite = createSprite(this.position.x, this.position.y);

        this.sprite.addAnimation('walking_small', '/assets/sprites/mario/running/small/frame_1.png', '/assets/sprites/mario/running/small/frame_2.png', '/assets/sprites/mario/running/small/frame_3.png');
        this.sprite.addAnimation('walking_super', '/assets/sprites/mario/running/super/frame_1.png', '/assets/sprites/mario/running/super/frame_2.png', '/assets/sprites/mario/running/super/frame_3.png');

        this.sprite.addImage('idle_small', this.idle_small);
        this.sprite.addImage('jumping_small', this.jumping_small);

        this.sprite.addImage('idle_super', this.idle_super);
        this.sprite.addImage('jumping_super', this.jumping_super);

        this.position.x = this.sprite.position.x;
        this.position.y = this.sprite.position.y;
        this.position.direction = this.direction;
        this.position.is_attacking = this.is_attacking;

        this.sprite.addToGroup(loaded);
    }

    collide(collider, callback) {
    	this.sprite.collide(collider, callback);
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

        this.sprite.velocity.y += this.gravity;
    }
}