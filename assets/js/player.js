class Player {

    constructor(x, y) {
        this.position = {};
        this.position.x = x;
        this.position.y = y;

        this.lives = 3;
        this.coins = 0;
        this.score = 0;

        this.is_alive = true;

        this.speed = 3;
        this.friction = 0;
        this.gravity = gravity;
        this.jump_height = 18;

        this.on_ground = true;
        this.accept_damage = true;
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
        this.sprite.depth = 3;

        if (debug_mode) this.sprite.debug = true;

        this.sprite.addAnimation('dead', player_dead);

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

    death() {
        if (!this.is_alive) return;

        loop_music = false;
        do_physics = false;
        if (sounds.music.overworld_theme.isPlaying()) {
            sounds.music.overworld_theme.stop();
        }
        if (sounds.music.cave_theme.isPlaying()) {
            sounds.music.cave_theme.stop();
        }
        if (sounds.music.castle_theme.isPlaying()) {
            sounds.music.castle_theme.stop();
        }

        if (!sounds.music.death.isPlaying()) sounds.music.death.play();

        this.setVelocityX(0);
        this.setVelocityY(0);

        this.sprite.changeAnimation('dead');
        this.is_alive = false;
        setTimeout(function() {
            this.addVelocityY(-10);
            var death_gravity = setInterval(function() {
                this.addVelocityY(gravity);
            }.bind(this), 1000/30);
            setTimeout(function() {
                resetLevel();
                clearInterval(death_gravity);
                scene_manager.showScene(Transition);
                setTimeout(function() {
                    scene_manager.showScene(World_1_1);
                    do_physics = loop_music = true;
                }, 3000);
            }, 3000);
        }.apply(this), 300);
    }

    resetPosition() {
        // 0, 192

        this.is_super = this.has_starpower = this.has_firepower = false;

        this.is_alive = true;

        this.sprite.position.x = 0;
        this.sprite.position.y = 192;

        this.sprite.setDefaultCollider();

        this.sprite.velocity.x = 0;
        this.sprite.velocity.y = 0;

        this.changeAnimation('idle_small');
    }

    collide(collider, callback) {
    	this.sprite.collide(collider, callback);
    }

    overlap(collider, callback) {
    	this.sprite.overlap(collider, callback);
    }

    jump() {
        if (!this.is_alive) return;
        if (this.sprite.velocity.y !== 0) return;
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
        if (!this.is_alive) return;
    }

    moveRight() {
        if (!this.is_alive) return;
        this.sprite.mirrorX(1);
        this.sprite.velocity.x = this.speed;
    }

    moveLeft() {
        if (!this.is_alive) return;
        this.sprite.mirrorX(-1);
    	if (this.position.x > -((width/2)-20)) {
    		this.sprite.velocity.x = -this.speed;
    	} else {
    		this.sprite.velocity.x = 0;
    	}
    }

    idle() {
        if (!this.is_alive) return;
        if (this.is_super && this.on_ground) {
            this.changeAnimation('idle_super');
        } else if (this.on_ground) {
            this.changeAnimation('idle_small');
        }
    	this.sprite.velocity.x = 0;
    }

    addVelocityY(vel) {
        this.sprite.velocity.y += vel;
    }

    addVelocityX(vel) {
        this.sprite.velocity.x += vel;
    }

    setVelocityY(vel) {
        this.sprite.velocity.y = vel;
    }

    setVelocityX(vel) {
        this.sprite.velocity.x = vel;
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
        

        if (this.sprite.position.y >= 224) {
            this.death();
        }

        if (this.sprite.velocity.y >= 10) {
            this.sprite.velocity.y = 10;
        }
    }
}