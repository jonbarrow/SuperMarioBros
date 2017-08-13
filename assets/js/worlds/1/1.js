function World_1_1() {

    this.preload = function() {

        sounds.music.theme_loop = loadSound('assets/music/smb_theme_loop.wav');

        gravity = 1;

        goomba = new SpriteSheet(entity_sheet,
        [
            {'name':'goomba_1','frame':{'x':0,'y':374,'width':32,'height':32}},
            {'name':'goomba_2','frame':{'x':38,'y':374,'width':32,'height':32}}
        ]);
        goomba = loadAnimation(goomba);

        goomba_dead = new SpriteSheet(entity_sheet, [{'name':'goomba_1','frame':{'x':76,'y':374,'width':32,'height':32}}]);
        goomba_dead = loadAnimation(goomba_dead);

        background_hill_flat_slope_left = new SpriteSheet(tile_sheet, [{'name':'background_hill_flat_slope_left','frame':{'x':264,'y':264,'width':32,'height':32}}]);
        background_hill_flat_slope_left = loadAnimation(background_hill_flat_slope_left);

        background_hill_flat_slope_right = new SpriteSheet(tile_sheet, [{'name':'background_hill_flat_slope_right','frame':{'x':330,'y':264,'width':32,'height':32}}]);
        background_hill_flat_slope_right = loadAnimation(background_hill_flat_slope_right);

        background_hill_flat_top = new SpriteSheet(tile_sheet, [{'name':'background_hill_flat_top','frame':{'x':297,'y':264,'width':32,'height':32}}]);
        background_hill_flat_top = loadAnimation(background_hill_flat_top);

        background_hill_flat_inner = new SpriteSheet(tile_sheet, [{'name':'background_hill_flat_inner','frame':{'x':297,'y':297,'width':32,'height':32}}]);
        background_hill_flat_inner = loadAnimation(background_hill_flat_inner);

        background_hill_flat_inner_dots_right = new SpriteSheet(tile_sheet, [{'name':'background_hill_flat_inner_dots_right','frame':{'x':264,'y':297,'width':32,'height':32}}]);
        background_hill_flat_inner_dots_right = loadAnimation(background_hill_flat_inner_dots_right);

        background_hill_flat_inner_dots_left = new SpriteSheet(tile_sheet, [{'name':'background_hill_flat_inner_dots_left','frame':{'x':330,'y':297,'width':32,'height':32}}]);
        background_hill_flat_inner_dots_left = loadAnimation(background_hill_flat_inner_dots_left);

        
        new BackgroundTile('hill_flat', -240, 192);

        ground_tile = new SpriteSheet(tile_sheet, [{'name':'ground','frame':{'x':0,'y':0,'width':32,'height':32}}]);
        ground_tile = loadAnimation(ground_tile);
        
        brick_tile = new SpriteSheet(tile_sheet, [{'name':'brick','frame':{'x':33,'y':0,'width':32,'height':32}}]);
        brick_tile = loadAnimation(brick_tile);
        
        item_block_tiles = new SpriteSheet(tile_sheet,
        [
            {'name':'frame_1','frame':{'x':759,'y':0,'width':32,'height':32}},
            {'name':'frame_1_2','frame':{'x':759,'y':0,'width':32,'height':32}},
            {'name':'frame_2','frame':{'x':792,'y':0,'width':32,'height':32}},
            {'name':'frame_2_2','frame':{'x':792,'y':0,'width':32,'height':32}},
            {'name':'frame_3','frame':{'x':825,'y':0,'width':32,'height':32}},
            {'name':'frame_3_2','frame':{'x':825,'y':0,'width':32,'height':32}}
        ]);
        item_block_tiles = loadAnimation(item_block_tiles);
        
        item_block_used_tile = new SpriteSheet(tile_sheet, [{'name':'brick','frame':{'x':858,'y':0,'width':32,'height':32}}]);
        item_block_used_tile = loadAnimation(item_block_used_tile);
        
        mushroom_texture = new SpriteSheet(tile_sheet, [{'name':'mushroom','frame':{'x':825,'y':264,'width':32,'height':32}}]);
        mushroom_texture = loadAnimation(mushroom_texture);
        
        level_tile_brick_shatter = loadImage('assets/textures/brick_shatter_1.png');
    }

    this.setup = function() {
        this.preload();

        for (var x=-240;x<1424;x+=32) {
            new Block('ground', x, 224);
            new Block('ground', x, 256);
        }

        var tet = new Block('ground', 900, 192);
        tet.tile.is_test = true;

        var tet = new Block('ground', 500, 192);
        tet.tile.is_test = true;
        
        

        /*new Block('brick', 40, 100);
        new Block('item_block', 72, 100, {is_breakable: false});
        new Item('mushroom', 72, 68);*/


        new Block('coin_block', 272, 96, {is_infinite: false, is_brick: false});

        new Block('brick', 400, 96);
        new Block('item_block', 432, 96, {item: 'mushroom'});
        new Block('brick', 464, 96);
        new Block('coin_block', 496, 96, {is_infinite: false, is_brick: false});
        new Block('brick', 528, 96);

        new Block('coin_block', 464, -32, {is_infinite: false, is_brick: false});

        new Entity('goomba', 432, 193);

        createSprite(0, 0, 50, 50); // Reference sprite, since the whole "world" is one solid color

        document.getElementById('container').appendChild(document.getElementsByTagName('canvas')[0]);
    }

    this.draw = function() {
        if (!sounds.music.theme_loop.isPlaying() && loop_music) {
            sounds.music.theme_loop.play();
            sounds.music.theme_loop.setVolume(0.3);
        }


        background(92, 148, 252);
        
        /*textFont(fonts.game);
        textSize(16);
        text('Score: ' + player.score, 0, 0);*/

        drawSprites();

        textSize(12);
        textAlign(CENTER);
        fill(0, 102, 153);
        text('x: ' + player.position.x + ', y: ' + player.position.y, player.position.x, (player.position.y-32));
    }
}