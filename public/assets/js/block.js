/*function Block(type, x, y, metadata=null) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.metadata = metadata;
}*/

class Block {
    constructor(type, x, y, metadata=null) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.metadata = metadata;

        this.initialize()
    }

    initialize() {
        this.tile = createSprite(this.x, this.y);
	    this.tile.scale = 2;
        this.selectType();
        if (this.metadata) {
            this.loadMetadata();
        }
        this.finalize();
        
    }

    selectType() {
        switch (this.type) {
            case 'brick':
                this.tile.addImage(level_tile_brick);
                break;
            case 'item_brick':
                if (!this.metadata) throw new Error('Block expected metadata, got null instead');
                this.tile.addImage('unused', level_tile_brick);
                this.tile.addImage('used',level_tile_floor); // replace with "used" texture
                break;
            case 'ground':
                this.tile.addImage(level_tile_floor);
                break;
            default:
                throw new Error('Invalid block type');
                break;
        }
    }

    loadMetadata() {
        if (this.metadata.item) {
            this.tile.is_itemblock = true;
            switch (this.metadata.item) {
                case 'coin':
                    this.tile.is_coinblock = true;
                    break;
            
                default:
                    throw new Error('Invalid block item type');
                    break;
            }
        }

        if (this.metadata.is_breakable) {
            if (this.metadata.item) {
                throw new Error('Item blocks cannot be breakable')
            }
            this.tile.is_breakable = true;
        }
        
    }

    finalize() {
        this.tile.addToGroup(blocks);
    }
}