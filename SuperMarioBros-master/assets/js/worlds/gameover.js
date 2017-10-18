function GameOver() {

    this.draw = function() {

        background(0, 0, 0);

        textFont(fonts.game);
        textSize(18);
        textAlign(CENTER);
        fill(255, 255, 255);
        text(‘GAME OVER’);
    }
}