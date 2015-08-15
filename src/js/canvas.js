var canvas;
function getCanvas() {
    if (canvas) {
        return canvas;
    }
    
    return (canvas = new Canvas());
};

function Canvas() {
    var element = document.createElement('canvas');
    element.width = window.innerWidth;
    element.height = window.innerHeight;
    document.body.appendChild(element);

    var ctx = element.getContext('2d');

    this.getWidth = function() {
        return element.width;
    };
    
    this.getHeight = function() {
        return element.height;
    };
    
    this.clear = function() {
        ctx.clearRect(0, 0, element.width, element.height);
        return this;
    };
    
    this.drawText = function(x, y, text) {
        ctx.fillStyle = "red";
        ctx.font = "48px serif";
        ctx.fillText(text, x, y);
        return this;
    };
    
    this.fillStyle = function(fillStyle) {
        ctx.fillStyle = fillStyle;
        return this;
    };
    
    this.fillRect = function(x, y, width, height) {
        ctx.fillRect(x, y, width, height);
        return this;
    };
    
    this.translate = function(x, y) {
        ctx.translate(x, y);
        return this;
    };
    
    this.rotate = function(direction) {
        ctx.rotate(direction);
        return this;
    };
    
    this.save = function() {
        ctx.save();
        return this;
    };
    
    this.restore = function() {
        ctx.restore();
        return this;
    };
    
    this.ctx = function() {
        return ctx;
    };
}