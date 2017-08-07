class Item {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;

        this.initialize();
    }

    initialize() {
        this.item = createSprite(this.x, this.y, 32, 32);
        this.selectType();
        this.finalize();
    }

    selectType() {
        switch (this.id) {
            case 'mushroom':
                this.item.addAnimation('normal', mushroom_texture);
                break;
            
            default:
                throw new Error('Invalid item id type');
                break;
        }
    }

    finalize() {
        this.item.id = this.id;
        this.item.addToGroup(items);
    }
}