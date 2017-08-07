var do_physics=true, scene_manager, player, sounds, fonts, tile_sheet, entity_sheet;
var player_grow, player_idle_small, player_jumping_small, player_walking_small, player_idle_super, player_jumping_super, player_walking_super;
var player_sprite_sheet;
var test_image, test_sheet, test_animation;
var level_tiles, level_tile_floor, level_tile_brick, level_tile_brick_shatter;

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

function preload() {

	tile_sheet = loadImage('/assets/textures/tile_sheet.png');
	entity_sheet = loadImage('/assets/sprites/sheet.png');

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
        	powerup: loadSound('/assets/sounds/smb_powerup.wav'),
        },
        music: {
        	theme_loop: loadSound('/assets/music/smb_theme_loop.wav')
        }
	}
	
	player_grow = new SpriteSheet(entity_sheet,
	[
		{'name':'grow_1','frame':{'x':38,'y':86,'width':24,'height':32}},
		{'name':'grow_2','frame':{'x':0,'y':70,'width':32,'height':48}},
		{'name':'grow_3','frame':{'x':0,'y':0,'width':32,'height':64}}
	]);
	player_grow = loadAnimation(player_grow);

    player_idle_small = new SpriteSheet(entity_sheet, [{'name':'idle_small','frame':{'x':38,'y':86,'width':24,'height':32}}]);
	player_idle_small = loadAnimation(player_idle_small);

	player_jumping_small = new SpriteSheet(entity_sheet, [{'name':'jumping_small','frame':{'x':194,'y':86,'width':32,'height':32}}]);
	player_jumping_small = loadAnimation(player_jumping_small);

	player_walking_small = new SpriteSheet(entity_sheet,
	[
		{'name':'walk_1_small','frame':{'x':68,'y':88,'width':24,'height':30}},
		{'name':'walk_2_small','frame':{'x':98,'y':86,'width':22,'height':32}},
		{'name':'walk_3_small','frame':{'x':126,'y':86,'width':30,'height':32}}
	]);
	player_walking_small = loadAnimation(player_walking_small);
	
	player_idle_super = new SpriteSheet(entity_sheet, [{'name':'idle_super','frame':{'x':0,'y':0,'width':32,'height':64}}]);
	player_idle_super = loadAnimation(player_idle_super);

	player_jumping_super = new SpriteSheet(entity_sheet, [{'name':'jumping_super','frame':{'x':222,'y':2,'width':32,'height':62}}]);
	player_jumping_super = loadAnimation(player_jumping_super);
	
	player_walking_super = new SpriteSheet(entity_sheet,
	[
		{'name':'walk_1_super','frame':{'x':76,'y':4,'width':32,'height':60}},
		{'name':'walk_2_super','frame':{'x':116,'y':2,'width':28,'height':62}},
		{'name':'walk_3_super','frame':{'x':146,'y':0,'width':32,'height':64}}
	]);
	player_walking_super = loadAnimation(player_walking_super);

}

function setup() {
    
    blocks = new Group();
    enemies = new Group();
    items = new Group();

	createCanvas(512, 512);
	
	scene_manager = new SceneManager();
	scene_manager.addScene(World_1_1);

	scene_manager.showScene(World_1_1);

	player = new Player(0, 192);
}

function draw() {

	if (player.position.x >= 0) {
		translate(width/2, height/2);
		translate(-player.position.x, 0);
	} else {
		translate(width/2, height/2);
		translate(0, 0);
	}

	player.collide(blocks, function(player_sprite, block) {
		if (block.position.y < player_sprite.position.y && player_sprite.velocity.y < 0) {
			if (block.is_itemblock || block.is_coinblock) {
				var blockstate = block.getAnimationLabel();
				if (blockstate == 'unused') {
					pushBlock(block);
					block.changeAnimation('used');
				} else {
					sounds.effects.bump.play();
				}

				if (blockstate == 'unused') {
					if (block.is_itemblock) {
						switch (block.item) {
							case 'mushroom':
								new Item('mushroom', block.position.x, block.position.y-32);
								break;
						
							default:
								throw new Error('Invalid block item type');
								break;
						}
					} else if (block.is_coinblock) {
						// handle coins later
					}
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

	player.overlap(items, function(player_sprite, item) {
		if (!item.id) return;
		switch (item.id) {
			case 'mushroom':
				sounds.effects.powerup.play();
				do_physics = false;
				if (!player.is_super) {
					player.changeAnimation('grow');
					setTimeout(function() {
						do_physics = true;
						player.is_super = true;
						player.sprite.height = 64;
						player.changeAnimation('idle_super');
					}, 700);
				}
					
				break;
		
			default:
				throw new Error('Invalid item id type');
				break;
		}
		item.remove();
	});

	if (do_physics) {

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
	} else {
		player.sprite.velocity.x = player.sprite.velocity.y = 0;
	}

	player.update_position();

    scene_manager.draw();
}