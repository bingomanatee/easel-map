
function Box(x, y, w, h, c){

    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.color = c;


}

Box.prototype = {

    range: function (){
        return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        };
    },

    sprite: function(){
        var shape = new createjs.Shape();
        shape.graphics.f(this.color).dr(0, 0, this.width, this.height).ef();

        shape.x = this.x;
        shape.y = this.y;

        return shape;
    }

};