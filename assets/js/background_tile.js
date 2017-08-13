class BackgroundTile {
    constructor(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;

        this.selectType();
    }

    selectType() {
        var section;
        switch (this.type) {
            case 'hill_flat':
                section = createSprite(this.x, this.y);
                section.addAnimation('normal', background_hill_flat_slope_left);
                section.depth = -1;

                /*section = createSprite(this.x+31, this.y);
                section.addAnimation('normal', background_hill_flat_inner);
                section.depth = -2;*/

                section = createSprite(this.x+32, this.y-32);
                section.addAnimation('normal', background_hill_flat_slope_left);
                section.depth = -1;

                section = createSprite(this.x+64, this.y-64);
                section.addAnimation('normal', background_hill_flat_top);
                section.depth = -1;

                section = createSprite(this.x+96, this.y-32);
                section.addAnimation('normal', background_hill_flat_slope_right);
                section.depth = -1;

                section = createSprite(this.x+128, this.y);
                section.addAnimation('normal', background_hill_flat_slope_right);
                section.depth = -1;

                section = createSprite(this.x+32, this.y);
                section.addAnimation('normal', background_hill_flat_inner_dots_right);
                section.depth = -1;

                section = createSprite(this.x+64, this.y);
                section.addAnimation('normal', background_hill_flat_inner);
                section.depth = -1;

                section = createSprite(this.x+64, this.y-32);
                section.addAnimation('normal', background_hill_flat_inner_dots_right);
                section.depth = -1;

                section = createSprite(this.x+96, this.y);
                section.addAnimation('normal', background_hill_flat_inner_dots_right);
                section.depth = -1;

                
                break;
            
            default:
                throw new Error('Invalid item id type');
                break;
        }
    }
}