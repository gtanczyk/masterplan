function GameWorld() {
    this.objects = [];
    this.collisionHandlers = [];
};

/**
 * Add object
 * @param object
 */
GameWorld.prototype.addObject = function(object) {
    this.objects.push.apply(this.objects, arguments);
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
GameWorld.prototype.queryObjects = function(type, x, y, width, height) {
    return this.objects.filter(function(object) {
        return !type || object instanceof type;
    });
};

/**
 * Update game state
 * @param elapsedTime how much time elapsed since last update
 */
GameWorld.prototype.update = function(elapsedTime) {
    while(elapsedTime > 0) {
        var deltaTime = Math.max(elapsedTime, UPDATE_TICK);
        this.objects.forEach(function(object) {
            this.updateObject(object, deltaTime / UPDATE_TICK);
        }, this);
        elapsedTime -= deltaTime;
        
        this.collisions();
    }
};

/**
 * Collision check
 */
GameWorld.prototype.collisions = function() {
    this.objects.forEach(function(objectLeft, idxLeft) {
        this.objects.forEach(function(objectRight, idxRight) {
           if (idxLeft <= idxRight) {
               return;
           } 
            
           if(VM.distance(objectLeft, objectRight) < 10) {
               this.triggerCollisions(objectLeft, objectRight);
           }
        }, this);
    }, this);
};

GameWorld.prototype.triggerCollisions = function(leftObject, rightObject) {
    this.collisionHandlers.forEach(function(collisionHandler) {
        if (leftObject instanceof collisionHandler.left && rightObject instanceof collisionHandler.right) {
            collisionHandler.handler(leftObject, rightObject);
        }
        if (rightObject instanceof collisionHandler.left && leftObject instanceof collisionHandler.right) {
            collisionHandler.handler(rightObject, leftObject);
        }
    });
};

GameWorld.prototype.onCollision = function(leftObjectType, rightObjectType, handler) {
    this.collisionHandlers.push({
        left: leftObjectType,
        right: rightObjectType,
        handler: handler
    });
};

/**
 * Updates object
 * @param object
 * @param deltaTime
 */
GameWorld.prototype.updateObject = function(object, deltaTime) {
    object.update(deltaTime);
};