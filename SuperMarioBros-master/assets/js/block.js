class Block {
    constructor(type, x, y, metadata=null, world_type=1) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.metadata = metadata;
        this.world_type = world_type;

        this.initialize();
    }

    initialize() {
        this.tile = createSprite(this.x, this.y);
        this.tile.depth = 2;

        if (debug_mode) this.tile.debug = true;

        this.selectType();
        this.finalize();
        
    }

    selectType() {
        switch (this.type) {
            case 'brick':
                this.tile.addAnimation('normal', brick_tile);
                this.tile.is_breakable = true;
                this.tile.is_pushing = false;
                break;
            case 'ground':
                this.tile.addAnimation('normal', ground_tile);
                break;
            case 'item_block':
                if (!this.metadata) throw new Error('Block expected metadata, got null instead');
                this.tile.is_itemblock = true;
                this.loadMetadata();
                this.tile.addAnimation('unused', item_block_tiles);
                this.tile.addAnimation('used', item_block_used_tile);
                break;
            case 'coin_block':
                if (!this.metadata) throw new Error('Block expected metadata, got null instead');
                this.loadMetadata();
                this.tile.addAnimation('used', item_block_used_tile);
                break;
            
            default:
                throw new Error('Invalid block type');
                break;
        }
    }

    loadMetadata() {
        if (this.metadata.item) {
            this.tile.is_itemblock = true;
            this.tile.is_pushing = false;
            this.tile.item = this.metadata.item;
        }

        if (this.type == 'coin_block') {
            this.tile.is_coinblock = true;
            this.tile.is_pushing = false;
            this.tile.is_infinite = this.metadata.is_infinite;
            if (this.metadata.is_brick) {
                 this.tile.addAnimation('unused', brick_tile);
            } else {
                this.tile.addAnimation('unused', item_block_tiles);
            }
        }

        if (this.metadata.is_breakable) {
            if (this.tile.is_itemblock) {
                throw new Error('Item blocks cannot be breakable')
            }
            this.tile.is_breakable = true;
        }
        
    }

    finalize() {
        this.tile.addToGroup(blocks);
    }
}