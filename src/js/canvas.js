var canvas;

/**
 * @returns {Canvas}
 */
function getCanvas() {
    if (canvas) {
        return canvas;
    }
    
    return (canvas = new Canvas());
};

/**
 * @constructor
 * @final
 */
function Canvas() {
    this.element = document.createElement('canvas');
    this.ctx = this.element.getContext('2d');
    
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    
    document.body.appendChild(this.element);
}

Canvas.prototype.getWidth = function() {
    return this.element.width;
};
    
Canvas.prototype.getHeight = function() {
    return this.element.height;
};
    
Canvas.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
    return this;
};
    
Canvas.prototype.drawText = function(x, y, text) {
    this.ctx.fillStyle = "red";
    this.ctx.font = "48px serif";
    this.ctx.fillText(text, x, y);
    return this;
};
    
Canvas.prototype.fillStyle = function(fillStyle) {
    this.ctx.fillStyle = fillStyle;
    return this;
};
    
Canvas.prototype.fillRect = function(x, y, width, height) {
    this.ctx.fillRect(x, y, width, height);
    return this;
};
    
Canvas.prototype.drawImage = function(image, x, y) {
    this.ctx.drawImage(image, x, y);
    return this;
};
    
Canvas.prototype.translate = function(x, y) {
    this.ctx.translate(x, y);
    return this;
};
    
Canvas.prototype.rotate = function(direction) {
    this.ctx.rotate(direction);
    return this;
};
    
Canvas.prototype.save = function() {
    this.ctx.save();
    return this;
};
    
Canvas.prototype.restore = function() {
    this.ctx.restore();
    return this;
};
    
Canvas.prototype.ctx = function() {
    return ctx;
};

Canvas.prototype.resize = function() {
    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;    
};  