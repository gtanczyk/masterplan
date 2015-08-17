/**
 * @constructor
 */
function GameWorld() {
    this.bonuses = [];
    this.objects = [];
    this.collisionHandlers = [];
    
    this.worldTime = 0;
    
    this.onCollision(BoatObject, BoatObject, this.onBoatCollision.bind(this));
    this.onCollision(BoatObject, WaypointEdgeObject, this.onBoatWaypointEdgeCollision.bind(this))
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
 * @return {Number} elapsedTime not consumed
 */
GameWorld.prototype.update = function(elapsedTime) {
    var deltaTime = Math.min(elapsedTime, UPDATE_TICK);
    this.objects.forEach(function(object) {
        this.updateObject(object, deltaTime / UPDATE_TICK);
    }, this);
    elapsedTime -= deltaTime;
    this.worldTime += deltaTime;
    
    this.collisions();
    this.deactivateBonuses();
    
    return elapsedTime;
};

/**
 * Collision check
 */
GameWorld.prototype.collisions = function() {
    this.queryObjects(BoatObject).forEach(function(boat, idx) {
        // boat -> waypoint
        this.queryObjects(WaypointObject).forEach(function(waypoint) {
           // did boat cross the line 
           var inter = (VMath.intersectLineLine(
               waypoint.leftVec(), 
               waypoint.rightVec(), 
               boat.lastVec(),
               boat.vec()));
           
           if (inter) {
               this.triggerCollisions(waypoint, boat);
           }
           
           if (VMath.distance(boat.vec(), waypoint.leftVec()) < boat.getWidth()/2) {
               this.triggerCollisions(waypoint.getLeftEdge(), boat);
           }
           
           if (VMath.distance(boat.vec(), waypoint.rightVec()) < boat.getWidth()/2) {
               this.triggerCollisions(waypoint.getRightEdge(), boat);
           }
        }, this);
        // boat -> bonus
        this.queryObjects(BonusObject).forEach(function(bonus) {
           if (VMath.distance(boat.vec(), bonus.vec()) < bonus.getWidth()) {
               this.triggerCollisions(bonus, boat);
           } 
        }, this);
        // boat -> boat
        this.queryObjects(BoatObject).forEach(function(boatLeft, idxLeft) {
            if (idx <= idxLeft) {
                return;
            }
            
            if (VMath.distance(boat.vec(), boatLeft.vec()) < boat.getWidth()) {
                this.triggerCollisions(boat, boatLeft);
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

GameWorld.prototype.onBoatCollision = function(leftBoat, rightBoat) {
    // boats should bounce off each other
    var distance = VMath.distance(leftBoat.vec(), rightBoat.vec());
    var sub = VMath.scale(VMath.normalize(VMath.sub(leftBoat.vec(), rightBoat.vec())), leftBoat.getWidth() - distance);
    leftBoat.addForce(sub);
    rightBoat.addForce(VMath.scale(sub, -1));
};

GameWorld.prototype.onBoatWaypointEdgeCollision = function(boat, edge) {
    // boats should bounce off waypoint edges
    var distance = VMath.distance(boat.vec(), edge.vec());
    var sub = VMath.scale(VMath.normalize(VMath.sub(boat.vec(), edge.vec())), (boat.getWidth() - distance)/10);
    boat.addForce(sub);
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
    this.bonuses.splice(0, 0, new (bonus.getGameBonus())(boat, this.worldTime));
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