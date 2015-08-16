/**
 * @param {GameWorld} world
 * @constructor
 */
function Race(world) {
    this.world = world;
    this.waypointSequence = [];
    this.characters = [];
    this.finishTime = 60000;
    
    world.onCollision(BoatObject, WaypointObject, this.onWaypointCollision.bind(this));
    world.onCollision(BoatObject, BonusObject, this.onBonusCollision.bind(this));
};

Race.prototype.update = function() {
    if (this.getTime() > this.finishTime) {
        updateState(EVENT_RACE_OVER);
    }
    
    this.characters.every(function(character) {
       character.update(); 
    });
    
    if (this.finished) {
        return;
    }
    
    // finish race if everyone has checked all waypoints
    if (this.world.queryObjects(BoatObject).every(function(boat) {
        return this.getNextWaypoint(boat) == null;
    }, this)) {
        this.finishTime = this.getTime() + 1000;
        this.finished = true;
    }
};

Race.prototype.getTime = function() {
    return this.world.getTime();
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
    this.world.activateBonus(bonus, boat, bonus.getGameBonus());
};

Race.prototype.getWaypointCount = function(boat) {
    return boat.getWaypoints().length;
};

/**
 * @param {BoatObject} boat
 * @returns {WaypointObject}
 */
Race.prototype.getNextWaypoint = function(boat) {
    var next = this.waypointSequence.reduce(function(last, waypoint) {
        return waypoint.hasChecked(boat) ? waypoint : !last || last.hasChecked(boat) ? waypoint : last;
    });
    
    if (!next.hasChecked(boat)) {
        return next;
    }
};

/**
 * @param {Character} character
 */
Race.prototype.addCharacter = function(character) {
    this.characters.push(character);
}