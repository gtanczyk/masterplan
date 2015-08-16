/**
 * @constructor
 */
function GameObject(x, y, width, height, direction) {
    this.x = x;
    this.y = y;
    this.lastX = x;
    this.lastY = y;
    this.direction = direction;
    this.objectWidth = width;
    this.objectHeight = height;    
}

GameObject.prototype.update = function(deltaTime) {
    
};

/**
 * @param {Canvas} canvas
 */
GameObject.prototype.render = function(canvas) {
    canvas.save()       
        .translate(-this.getWidth()/2, -this.getHeight()/2)
        .fillRect(0, 0, this.getWidth(), this.getHeight())
        .restore();
};

GameObject.prototype.getX = function() { 
    return this.x; 
};
GameObject.prototype.setX = function(x) {
    this.lastX = this.x;
    this.x = x; 
};

GameObject.prototype.getY = function() { 
    return this.y;
};
GameObject.prototype.setY = function(y) {
    this.lastY = this.y;
    this.y = y;
};

GameObject.prototype.getDirection = function() { 
    return this.direction; 
};
GameObject.prototype.setDirection = function(direction) {
    this.direction = direction;
};
GameObject.prototype.getWidth = function() { 
    return this.objectWidth; 
};
GameObject.prototype.getHeight = function() { 
    return this.objectHeight;
};
GameObject.prototype.vec = function() {
    return [this.x, this.y];
};
GameObject.prototype.lastVec = function() {
    return [this.lastX, this.lastY];
};