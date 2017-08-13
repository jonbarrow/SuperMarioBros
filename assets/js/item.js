class Item {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;

        this.initialize();
    }

    initialize() {
        this.item = createSprite(this.x, this.y, 32, 32);
        this.item.depth = 1;

        if (debug_mode) this.item.debug = true;

        this.selectType();
        this.finalize();
    }

    selectType() {
        switch (this.id) {
            case 'mushroom':
                this.item.addAnimation('normal', mushroom_texture);
                this.item.direction = 'right';
                break;
            
            default:
                throw new Error('Invalid item id type');
                break;
        }
    }

    finalize() {
        this.item.id = this.id;
        this.appear();
    }

    appear() {
        this.item.velocity.y -= 2;
        var orig_y = this.item.position.y;
        setTimeout(function() {
            this.item.velocity.y = 0;
            if (this.item.position.y !== (orig_y-32)) {
                this.item.position.y = orig_y-32;
            }
            this.item.addToGroup(items);
            this.startAI();
        }.bind(this), 300);
    }

    startAI() {
        switch (this.id) {
            case 'mushroom':

                setInterval(function() {
                    this.item.velocity.y += gravity;
                    if (this.item.direction == 'right') {
                        this.item.velocity.x = 2;
                    } else {
                        this.item.velocity.x = -2;
                    }
                    
                }.bind(this), 1000/30)
                break;
        
            default:
                break;
        }
    }
}