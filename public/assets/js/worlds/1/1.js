var ground_tile, brick_tile, item_block_tiles, item_block_used_tile;
var mushroom_texture;

function World_1_1() {

    this.preload = function() {
        ground_tile = new SpriteSheet(tile_sheet, [{'name':'ground','frame':{'x':0,'y':0,'width':32,'height':32}}]);
        ground_tile = loadAnimation(ground_tile);
        
        brick_tile = new SpriteSheet(tile_sheet, [{'name':'brick','frame':{'x':32,'y':0,'width':32,'height':32}}]);
        brick_tile = loadAnimation(brick_tile);
        
        item_block_tiles = new SpriteSheet(tile_sheet,
        [
            {'name':'frame_1','frame':{'x':736,'y':0,'width':32,'height':32}},
            {'name':'frame_1_2','frame':{'x':736,'y':0,'width':32,'height':32}},
            {'name':'frame_2','frame':{'x':768,'y':0,'width':32,'height':32}},
            {'name':'frame_2_2','frame':{'x':768,'y':0,'width':32,'height':32}},
            {'name':'frame_3','frame':{'x':800,'y':0,'width':32,'height':32}},
            {'name':'frame_3_2','frame':{'x':800,'y':0,'width':32,'height':32}}
        ]);
        item_block_tiles = loadAnimation(item_block_tiles);
        
        item_block_used_tile = new SpriteSheet(tile_sheet, [{'name':'brick','frame':{'x':832,'y':0,'width':32,'height':32}}]);
        item_block_used_tile = loadAnimation(item_block_used_tile);
        
        mushroom_texture = new SpriteSheet(tile_sheet, [{'name':'mushroom','frame':{'x':801,'y':257,'width':32,'height':32}}]);
        mushroom_texture = loadAnimation(mushroom_texture);
        
        level_tile_brick_shatter = loadImage('/assets/textures/brick_shatter_1.png');
    }

    this.setup = function() {
        this.preload();

        for (var x=-240;x<1424;x+=32) {
            new Block('ground', x, 224);
            new Block('ground', x, 256);
        }
        
        

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
        

        createSprite(0, 0, 50, 50); // Reference sprite, since the whole "world" is one solid color

        document.getElementById('container').appendChild(document.getElementsByTagName('canvas')[0]);
    }

    this.draw = function() {
        if (!sounds.music.theme_loop.isPlaying()) {
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