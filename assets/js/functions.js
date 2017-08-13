function breakBlock(block) {
	sounds.effects.break_block.play();
	createShatter(block.position.x, block.position.y, false, true);
	createShatter(block.position.x, block.position.y, false, false);
	createShatter(block.position.x, block.position.y, true, true);
	createShatter(block.position.x, block.position.y, true, false);
	block.remove();
}

function pushBlock(block) {
	if (block.is_pushing) return;
	var orig_y = block.position.y;
	block.is_pushing = true;
	sounds.effects.bump.play();
	block.velocity.y -= 4;
	setTimeout(function() {
		block.velocity.y += 8;
		setTimeout(function() {
			block.velocity.y = 0;
			block.is_pushing = false;
			if (block.position.y !== orig_y) {
				console.log('Block position broken, now fixing')
				block.position.y = orig_y;
			}
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

function resetLevel() {
	blocks.removeSprites();
	blocks.clear();
	enemies.removeSprites();
	enemies.clear();
	items.removeSprites();
	items.clear();
	tiles.removeSprites();
	tiles.clear();

	scene_manager.scene.oScene.setup();

	player.resetPosition();
}