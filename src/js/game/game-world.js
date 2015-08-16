/**
 * @constructor
 */
function GameWorld() {
    this.bonuses = [];
    this.objects = [];
    this.collisionHandlers = [];
    
    this.worldTime = 0;
};

GameWorld.prototype.destroy = function() {
    this.bonuses.forEach(function(bonus) {
        bonus.deactivate();
    });
};

GameWorld.prototype.getTime = function() {
    return this.worldTime;
};

/**
 * Add object
 * @param object
 */
GameWorld.prototype.addObject = function(object) {
    this.objects.push.apply(this.objects, arguments);
};

/**
 * @param {GameObject} object
 */
GameWorld.prototype.removeObject = function(object) {
    this.objects.splice(this.objects.indexOf(object), 1);
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
        var deltaTime = Math.min(elapsedTime, UPDATE_TICK);
        this.objects.forEach(function(object) {
            this.updateObject(object, deltaTime / UPDATE_TICK);
        }, this);
        elapsedTime -= deltaTime;
        this.worldTime += deltaTime;
        
        this.collisions();
        this.deactivateBonuses();
    }
};

/**
 * Collision check
 */
GameWorld.prototype.collisions = function() {
    // boat -> waypoint
    this.queryObjects(WaypointObject).forEach(function(waypoint) {
        this.queryObjects(BoatObject).forEach(function(boat) {
           // did boat cross the line 
           var inter = (VMath.intersectLineLine(
               waypoint.leftVec(), 
               waypoint.rightVec(), 
               boat.lastVec(),
               boat.vec()));
           
           if (inter) {
               this.triggerCollisions(waypoint, boat);
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

// bonuses

/**
 * @param {BonusObject} bonus
 * @param {BoatObject} boat
 */
GameWorld.prototype.activateBonus = function(bonus, boat) {
    console.log("activating", bonus.getGameBonus());
    this.bonuses.push(new (bonus.getGameBonus())(boat, this.worldTime));
    this.removeObject(bonus);
};

GameWorld.prototype.deactivateBonuses = function() {
    this.bonuses = this.bonuses.filter(function(gameBonus) {
        if (!gameBonus.isActive(this.worldTime)) {
            console.log("dectivating", gameBonus);
            gameBonus.deactivate();
            return false;
        } else {
            return true;
        }
    }, this);
};