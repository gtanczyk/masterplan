function GameWorld() {
    this.objects = [];
};

/**
 * Add object
 * @param object
 */
GameWorld.prototype.addObject = function(object) {
    this.objects.push(object);
};

/**
 * Return all objects within given rect;
 * 
 * @param x
 * @param y
 * @param width
 * @param height
 * @returns {Array}
 */
GameWorld.prototype.queryObjects = function(x, y, width, height) {
    return this.objects;
};

/**
 * Update game state
 * @param elapsedTime how much time elapsed since last update
 */
GameWorld.prototype.update = function(elapsedTime) {
    while(elapsedTime > 0) {
        var deltaTime = Math.max(elapsedTime, 100);
        this.objects.forEach(function(object) {
            this.updateObject(object, deltaTime);
        }, this);
        elapsedTime -= deltaTime;
    }
};

/**
 * 
 * @param object
 * @param deltaTime
 */
GameWorld.prototype.updateObject = function(object, deltaTime) {
    object.x += object.vx * deltaTime;
    object.y += object.vy * deltaTime;
    
    // rotate object
    var cx = Math.cos(object.direction)
        cy = Math.sin(object.direction);
    var dx = Math.cos(object.targetDirection)
        dy = Math.sin(object.targetDirection);
    object.direction = Math.atan2((cy + dy)/2, (cx + dx)/2);
};