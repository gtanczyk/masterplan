/**
 * @constructor
 */
function GameWorld() {
    this.objects = [];
    this.collisionHandlers = [];
    this.edgeRadius = EDGE_RADIUS;
    
    this.worldTime = 0;
    
    this.onCollision(SoldierObject, SoldierObject, this.onSoldierCollision.bind(this));
    this.onCollision(SoldierObject, ArrowObject, this.onArrowCollision.bind(this));
};

GameWorld.prototype.destroy = function() {
};

GameWorld.prototype.getTime = function() {
    return this.worldTime;
};

GameWorld.prototype.getEdgeRadius = function() {
    // return this.edgeRadius;
    return Math.max(this.edgeRadius * 1.5 * (1 - this.getTime() / 60000), 200);
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

GameWorld.prototype.queryObjects = function(type, fn) {
    // var vec = [x, y];
    return this.objects.filter(function(object) {
        // if (VMath.distance(vec, object.vec > radius) {
        //     return;
        // }
        
        return (!type || object.isClass(type)) && (!fn || fn(object));
    });
};

/**
 * Update game state
 * @param elapsedTime how much time elapsed since last update
 * @return {Number} elapsedTime not consumed
 */
GameWorld.prototype.update = function(elapsedTime) {
    var deltaTime = Math.min(elapsedTime, MIN_TICK);
    this.objects.forEach(function(object) {
        this.updateObject(object, deltaTime / UPDATE_TICK);
    }, this);
    elapsedTime -= deltaTime;
    this.worldTime += deltaTime;
    
    this.collisions();
    
    return elapsedTime;
};

/**
 * Collision check
 */
GameWorld.prototype.collisions = function() {
    this.queryObjects(SoldierObject).forEach(function(soldier, idx) {
        if (soldier.life <= 0) {
            return;
        }

        // soldier -> soldier
        this.queryObjects(SoldierObject).forEach((soldierLeft, idxLeft) => {
            if (idx <= idxLeft || soldierLeft.life <= 0 || soldier === soldierLeft) {
                return;
            }
            
            if (VMath.withinDistance(soldier.vec, soldierLeft.vec, soldier.getWidth())) {
                this.triggerCollisions(soldier, soldierLeft);
            }
        });

        // soldier -> arrow
        this.queryObjects(ArrowObject).forEach(arrow => {
            if (arrow.isHit() && VMath.withinDistance(soldier.vec, arrow.vec, soldier.getWidth())) {
                this.triggerCollisions(soldier, arrow);
            }
        });

        // outside of battleground?
        if (!VMath.withinDistance(soldier.vec, [0, 0], this.getEdgeRadius())) {
            soldier.addForce(VMath.scale(VMath.normalize(soldier.vec), -1));
        }
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

GameWorld.prototype.onSoldierCollision = function(leftSoldier, rightSoldier) {
    // soldiers should bounce off each other
    var distance = VMath.distance(leftSoldier.vec, rightSoldier.vec);
    var sub = VMath.scale(VMath.normalize(VMath.sub(leftSoldier.vec, rightSoldier.vec)), leftSoldier.getWidth() - distance);
    leftSoldier.addForce(sub);
    rightSoldier.addForce(VMath.scale(sub, -1));

    if (leftSoldier.isEnemy(rightSoldier)) {
        leftSoldier.hit(rightSoldier);
        rightSoldier.hit(leftSoldier);
    }
};

GameWorld.prototype.onArrowCollision = function(soldier, arrow) {
    arrow.hit(soldier);
};

/**
 * Updates object
 * @param object
 * @param deltaTime
 */
GameWorld.prototype.updateObject = function(object, deltaTime) {
    object.update(deltaTime);
};

GameWorld.prototype.getAlive = function() {
    return this.queryObjects(SoldierObject, soldier => soldier.life > 0)
                .reduce((r, soldier) => (r[soldier.color] = (r[soldier.color] || 0) + 1, r), {})
};