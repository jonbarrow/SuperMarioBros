/**
 * Essentially the same thing as the `Player` class, just minus the socket connection
 * @param {*} x player spawn x
 * @param {*} y player spawn y
 * @param {*} name player name
 */

function PlayerEntity(x, y, name='Player') {

    this.name = name;

    this.position = {};
    this.position.x = x;
    this.position.y = y;

    this.speed = 3;

    this.direction = 'right';

    this.is_attacking = false;

    this.sprite_image_idle_right = sprite_image_idle_right;
    this.sprite_image_idle_left = sprite_image_idle_left;
    this.sprite_image_idle_down = sprite_image_idle_down;
    this.sprite_image_idle_up = sprite_image_idle_up;

    this.initialize = function() {
        this.sprite = createSprite(this.position.x, this.position.y);

        this.sprite.addImage('idle_right', this.sprite_image_idle_right);
        this.sprite.addImage('idle_left', this.sprite_image_idle_left);
        this.sprite.addImage('idle_down', this.sprite_image_idle_down);
        this.sprite.addImage('idle_up', this.sprite_image_idle_up);

        this.sprite.addAnimation('walk_up', '/assets/textures/characters/player_walk_up_1.png', '/assets/textures/characters/player_walk_up_2.png', '/assets/textures/characters/player_walk_up_3.png', '/assets/textures/characters/player_walk_up_4.png');
        this.sprite.addAnimation('walk_down', '/assets/textures/characters/player_walk_down_1.png', '/assets/textures/characters/player_walk_down_2.png', '/assets/textures/characters/player_walk_down_3.png', '/assets/textures/characters/player_walk_down_4.png');
        this.sprite.addAnimation('walk_right', '/assets/textures/characters/player_walk_right_1.png', '/assets/textures/characters/player_walk_right_2.png', '/assets/textures/characters/player_walk_right_3.png', '/assets/textures/characters/player_walk_right_4.png');
        this.sprite.addAnimation('walk_left', '/assets/textures/characters/player_walk_left_1.png', '/assets/textures/characters/player_walk_left_2.png', '/assets/textures/characters/player_walk_left_3.png', '/assets/textures/characters/player_walk_left_4.png');
    
        //this.sprite.addAnimation('attack_up');
        this.sprite.addAnimation('attack_down', '/assets/textures/characters/player_attack_down_1.png', '/assets/textures/characters/player_attack_down_2.png', '/assets/textures/characters/player_attack_down_3.png', '/assets/textures/characters/player_attack_down_4.png');
        //this.sprite.addAnimation('attack_right');
        //this.sprite.addAnimation('attack_left');

        this.position.x = this.sprite.position.x;
        this.position.y = this.sprite.position.y;
        this.position.direction = this.direction;
        this.position.is_attacking = this.is_attacking;

        this.sprite.addToGroup(players);
        
    }

    this.render = function() {
        /*loadImage('/assets/textures/characters/rogue like idle_Animation 1_0.png', function(sprite) {
            image(sprite, this.position.x, this.position.y);
        }.bind(this), function(error) {
            console.log(error);
        });*/
        
        //this.sprite.addImage(this.sprite_image);
       
    }

    this.getSpeed = function() {
        return this.speed;
    }

    this.getDirection = function() {
        return this.direction;
    }

    this.getPosition = function() {
        return this.position;
    }

    this.changeAnimation = function(animation) {
        this.sprite.changeAnimation(animation);
    }

    this.addSpeed = function(speed, rotation) {
        this.sprite.addSpeed(speed, rotation);
    }

    this.setSpeed = function(speed, rotation=0) {
        this.sprite.setSpeed(speed, rotation);
    }

    this.addToGroup = function(group) {
        this.sprite.addToGroup(group);
    }

    this.remove = function() {
        this.sprite.remove();
    }

    this.update_position = function() {
        this.position.x = this.sprite.position.x;
        this.position.y = this.sprite.position.y;
        this.position.direction = this.direction;
        this.position.is_attacking = this.is_attacking;

        textSize(12);
        textAlign(CENTER);
        fill(0, 102, 153);
        text(this.name, this.position.x, (this.position.y-30));
    }
}