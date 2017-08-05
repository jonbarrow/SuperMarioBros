var player, sounds, fonts;
var player_idle_small, player_jumping_small, player_idle_super, player_jumping_super;
var player_sprite_sheet;
var level_tiles, level_tile_floor, level_tile_brick, level_tile_brick_shatter;

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

function preload() {

	fonts =  {
		logo: loadFont('/assets/fonts/emulogic.ttf'),
		game: loadFont('/assets/fonts/Super Plumber Brothers.ttf')
	}

    sounds = {
        effects: {
        	break_block: loadSound('/assets/sounds/smb_breakblock.wav'),
        	bump: loadSound('/assets/sounds/smb_bump.wav'),
        	jump_small: loadSound('/assets/sounds/smb_jump-small.wav'),
        	jump_super: loadSound('/assets/sounds/smb_jump-super.wav'),
        },
        music: {
        	theme_beginning: loadSound('/assets/music/smb_theme_beginning.wav'),
        	theme_loop: loadSound('/assets/music/smb_theme_loop.wav')
        }
    }

    player_idle_small = loadImage('/assets/sprites/mario/idle_small.png');
	player_jumping_small = loadImage('/assets/sprites/mario/jumping_small.png');
	
	player_idle_super = loadImage('/assets/sprites/mario/idle_super.png');
    player_jumping_super = loadImage('/assets/sprites/mario/jumping_super.png');

    level_tile_floor = loadImage('/assets/textures/tiles/ground_1.png');
    level_tile_brick = loadImage('/assets/textures/tiles/brick_1.png');
    level_tile_brick_shatter = loadImage('/assets/textures/tiles/brick_shatter_1.png');
}

function setup() {
    
    blocks = new Group();
    blocks_test = new Group();
    enemies = new Group();
    loaded = new Group();

    createCanvas(512, 512);

    player = new Player(0, 192);

    for (var x=-784;x<840;x+=32) {
		new Block('ground', x, 224);
		new Block('ground', x, 256);
  	}

	new Block('brick', 40, 100, {is_breakable: true});
	new Block('brick', 72, 100);
	new Block('item_brick', 104, 100, {item:'coin',multiple:false});

    createSprite(0, 0, 50, 50); // Reference sprite, since the whole "world" is one solid color

    document.getElementById('container').appendChild(document.getElementsByTagName('canvas')[0]);

    sounds.music.theme_beginning.play();
    sounds.music.theme_beginning.setVolume(0.3);
}

function draw() {

	if (!sounds.music.theme_beginning.isPlaying() && !sounds.music.theme_loop.isPlaying()) {
		sounds.music.theme_loop.play();
		sounds.music.theme_loop.setVolume(0.3);
	}


	background(113, 158, 12);

    player.collide(blocks, function(player_sprite, block) {
    	if (block.position.y < player_sprite.position.y && player_sprite.velocity.y < 0) {
			if (block.is_itemblock) {
				sounds.effects.bump.play();
				var blockstate = block.getAnimationLabel();
				if (blockstate == 'unused') {
					pushBlock(block);
					block.changeAnimation('used');
				}
			} else if (player.is_super && block.is_breakable) {
				breakBlock(block);
			} else if (block.is_breakable) {
				pushBlock(block);
			} else {
				sounds.effects.bump.play();
			}
    	} else if (block.position.y > player_sprite.position.y) {
			player.on_ground = true;
		}
    	player_sprite.velocity.y = 0;
	   	if (player.is_jumping) player.is_jumping = false;
	});

    if (player.position.x >= 0) {
    	translate(width/2, height/2);
    	translate(-player.position.x, 0);
    } else {
    	translate(width/2, height/2);
    	translate(0, 0);
    }

    if (keyWentDown(UP_ARROW) || keyWentDown(87) || keyWentDown(32)) {
    	player.jump();
    } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    	player.crouch();
    } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    	player.moveRight();
    } else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    	player.moveLeft();
    } else {
        player.idle();
    }

    player.is_walking = false;
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68) || keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
		if (player.on_ground) {
			player.is_walking = true;
			if (player.is_super) {
				player.changeAnimation('walking_super');
			} else {
				player.changeAnimation('walking_small');
			}
		}
    }

    player.update_position();

    textSize(12);
    textAlign(CENTER);
    fill(0, 102, 153);
	text('x: ' + player.position.x + ', y: ' + player.position.y, player.position.x, (player.position.y-32));
	
	/*textFont(fonts.game);
  	textSize(16);
  	text('Score: ' + player.score, 0, 0);*/

    drawSprites();
}

function breakBlock(block) {
	sounds.effects.break_block.play();
	createShatter(block.position.x, block.position.y, false, true);
	createShatter(block.position.x, block.position.y, false, false);
	createShatter(block.position.x, block.position.y, true, true);
	createShatter(block.position.x, block.position.y, true, false);
	block.remove();
}

function pushBlock(block) {
	sounds.effects.bump.play();
	block.velocity.y -= 4;
	setTimeout(function() {
		block.velocity.y += 8;
		setTimeout(function() {
			block.velocity.y = 0;
		}, 50);
	}, 50);
}

function createShatter(x, y, isTop, isLeft) {
	var offset_x = 8,
		offset_y = 0,
		dir_x = 2,
		vel_y = 6;

	if (isTop) {
		offset_y = -8;
		vel_y = 8;
	}
	if (isLeft) {
		offset_x = -8;
		dir_x = -2;
	}
	var shatter = createSprite(x+offset_x, y+offset_y);
	shatter.scale = 1.5;

	if (isLeft) shatter.mirrorX(-1);

	shatter.addImage('broken', level_tile_brick_shatter);
	shatter.changeAnimation('broken');
	shatter.velocity.y -= vel_y;
	shatter.velocity.x += dir_x;
	shatter.rotationSpeed = 20;

	setInterval(function() {
		shatter.velocity.y += 1;
		shatter.rotation += 1;

	}, 1000/30);
}