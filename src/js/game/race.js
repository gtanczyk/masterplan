function Race(world) {
    this.world = world;
    this.elapsedTime = 0;
    this.waypointSequence = [];
    
    world.onCollision(BoatObject, WaypointObject, this.onWaypointCollision.bind(this));
    world.onCollision(BoatObject, BonusObject, this.onBonusCollision.bind(this));
};

Race.prototype.update = function(elapsedTime) {
    this.elapsedTime += elapsedTime;
};

Race.prototype.getTime = function() {
    return this.elapsedTime;
};

Race.prototype.orderWaypoints = function() {
    this.waypointSequence = Array.prototype.slice.call(arguments);
};

/**
 * @param {BoatObject} boat
 * @param {WaypointObject} waypoint
 */
Race.prototype.onWaypointCollision = function(boat, waypoint) {
    if (waypoint.canCheck(boat, this.waypointSequence)) {
        waypoint.checkBoat(boat);
    }
};

Race.prototype.onBonusCollision = function(boat, bonus) {
    console.log("bonus collision", boat, bonus);
};

Race.prototype.getWaypointCount = function(boat) {
    return boat.getWaypoints().length;
};