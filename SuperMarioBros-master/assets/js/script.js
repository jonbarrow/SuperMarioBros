var debug_mode=false;
var loop_music=true;
var do_physics=true, gravity=1, scene_manager, player, sounds, fonts, tile_sheet, entity_sheet;
var blocks, enemies, items, tiles;
var world=level=1;
var player_grow, player_idle_small, player_jumping_small, player_walking_small, player_idle_super, player_jumping_super, player_walking_super;
var player_sprite_sheet;

var background_hill_flat_slope_left, background_hill_flat_slope_right, background_hill_flat_top, background_hill_flat_inner, background_hill_flat_inner_dots_right, background_hill_flat_inner_dots_left;
var ground_tile, brick_tile, item_block_tiles, item_block_used_tile;
var mushroom_texture;
var goomba, goomba_dead;

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

function preload() {

	tile_sheet = loadImage('assets/textures/tile_sheet.png');
	entity_sheet = loadImage('assets/sprites/sheet.png');

	fonts =  {
		game: loadFont('assets/fonts/emulogic.ttf'),
		logo: loadFont('assets/fonts/Super Plumber Brothers.ttf')
	}

    sounds = {
        effects: {
        	break_block: loadSound('assets/sounds/smb_breakblock.wav'),
        	bump: loadSound('assets/sounds/smb_bump.wav'),
        	jump_small: loadSound('assets/sounds/smb_jump-small.wav'),
        	jump_super: loadSound('assets/sounds/smb_jump-super.wav'),
        	powerup: loadSound('assets/sounds/smb_powerup.wav'),
        	powerup_spawn: loadSound('assets/sounds/smb_powerup_appears.wav'),
        	pipe_travel_power_down: loadSound('assets/sounds/smb_pipe.wav'),
        	stomp: loadSound('assets/sounds/smb_stomp.wav')
        },
        music: {
			death: loadSound('assets/music/smb_mariodie.wav'),
			overworld_theme: loadSound('assets/music/smb_theme_loop.wav'),
			cave_theme: loadSound('assets/music/smb_theme_underground_loop.wav'),
			castle_theme: loadSound('assets/music/smb_theme_loop.wav')
        }
	}
	
	player_grow = new SpriteSheet(entity_sheet,
	[
		{'name':'grow_1','frame':{'x':38,'y':86,'width':24,'height':32}},
		{'name':'grow_2','frame':{'x':0,'y':70,'width':32,'height':48}},
		{'name':'grow_3','frame':{'x':0,'y':0,'width':32,'height':64}}
	]);
	player_grow = loadAnimation(player_grow);

	player_dead = new SpriteSheet(entity_sheet, [{'name':'dead','frame':{'x':456,'y':90,'width':28,'height':28}}]);
	player_dead = loadAnimation(player_dead);

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
	tiles = new Group();

	sounds.music.overworld_theme.playMode('restart');

	createCanvas(512, 512);

	document.getElementById('container').appendChild(document.getElementsByTagName('canvas')[0]);
	
	scene_manager = new SceneManager();
	scene_manager.addScene(GameOver)
	scene_manager.addScene(Transition);
	scene_manager.addScene(World_1_1);

	scene_manager.showScene(Transition);

	setTimeout(function() {
		scene_manager.showScene(World_1_1);
		player = new Player(0, 192);
	}, 3000);
}

function draw() {

	if (player) {
		if (player.is_alive) {
			player.collide(blocks, function(player_sprite, block) {

				if (player_sprite.touching.left || player_sprite.touching.right) {
					player_sprite.velocity.x = 0;
				}
				if (player_sprite.touching.bottom) {
					player.on_ground = true;
					player_sprite.velocity.y = 0;
					if (player.is_jumping) player.is_jumping = false;
				}
				if (player_sprite.touching.top && player_sprite.velocity.y < 0) {
					player_sprite.velocity.y = 0;
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
								sounds.effects.powerup_spawn.play();
								switch (block.item) {
									case 'mushroom':
										new Item('mushroom', block.position.x, block.position.y);
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
				}
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

			player.overlap(enemies, function(player_sprite, enemy) {

				var enemy_state = enemy.getAnimationLabel();
				if (!player.accept_damage || enemy_state == 'dead') return;
				if (player.has_starpower) {
					// handle this
					return;
				}
				if (player_sprite.velocity.y > 0) {
					if (sounds.effects.stomp.isPlaying()) sounds.effects.stomp.stop();
					sounds.effects.stomp.play();
					player_sprite.velocity.y = -10;
					enemy.changeAnimation('dead');
					setTimeout(function() {
						enemy.remove();
					}, 700);
				} else {
					if (player.is_super) {
						do_physics = false;
						if (!sounds.effects.pipe_travel_power_down.isPlaying()) sounds.effects.pipe_travel_power_down.play();
						if (player.has_firepower) {

						} else {
							player.changeAnimation('grow');
							setTimeout(function() {
								player.accept_damage = false;
								do_physics = true;
								player.is_super = false;
								player.sprite.height = 32;
								player.changeAnimation('idle_small');
								setTimeout(function() {
									player.accept_damage = true;
								}, 1000)
							}, 700);

						}
					} else {
						player.death();
					}
				}
			});
		}


		items.collide(blocks, (item, block) => {
			item.velocity.y = 0;
			if (block.is_pushing) {
				item.velocity.y -= 7;
			}
			if (item.position.x>block.position.x&&item.position.y>(block.position.y-(block.height-1))) {
				item.direction = 'right';
			} else if (item.position.x<block.position.x&&item.position.y>(block.position.y-(block.height-1))) {
				item.direction = 'left';
			} 
		});

		enemies.collide(blocks, (entity, block) => {
			entity.velocity.y = 0;
			if (block.is_pushing) {
				entity.mirrorY(-1);
			}
			if (entity.position.x>block.position.x&&entity.position.y>(block.position.y-(block.height-1))) {
				entity.direction = 'right';
			} else if (entity.position.x<block.position.x&&entity.position.y>(block.position.y-(block.height-1))) {
				entity.direction = 'left';
			} 
		});

		if (do_physics) {

			player.idle();

			if (keyWentDown(UP_ARROW) || keyWentDown(87) || keyWentDown(32)) {
				player.jump();
			}
			if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
				player.crouch();
			}
			if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
				player.moveRight();
			}
			if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
				player.moveLeft();
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
		} else if (player.is_alive) {
			player.setVelocityX(0);
			player.setVelocityY(0);
		}

		player.update_position();
	}

	

    scene_manager.draw();
}