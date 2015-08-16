/**
 * @constructor
 */
function GameObject(x, y, width, height, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.objectWidth = width;
    this.objectHeight = height;    
}

GameObject.prototype.update = function(deltaTime) {
    
};

GameObject.prototype.getX = function() { 
    return this.x; 
};
GameObject.prototype.getY = function() { 
    return this.y;
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