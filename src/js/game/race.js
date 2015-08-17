/**
 * @param {GameWorld} world
 * @constructor
 */
function Race(world) {
    this.world = world;
    /** {WaypointObject[]} */
    this.waypointSequence = [];
    this.characters = [];
    this.finishTime = 240000;

    /** {RaceStanding[]} */
    this.standings = [];
    
    world.onCollision(BoatObject, WaypointObject, this.onWaypointCollision.bind(this));
    world.onCollision(BoatObject, BonusObject, this.onBonusCollision.bind(this));
};

Race.prototype.update = function() {
    if (this.getTime() > this.finishTime) {
        updateState(EVENT_RACE_OVER);
    }
    
    this.characters.forEach(function(character) {
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
        
        if(this.hasFinished(boat)) {
            this.standings.push(new RaceStanding(boat, this.getTime()));
        }
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
};

Race.prototype.getPosition = function(boat) {
    var total = this.getTotal(boat);
    var lastChecked = this.waypointSequence.reduce(function(last, waypoint) {
        return waypoint.hasChecked(boat) ? waypoint : last;
    }, null);
    
    if (!lastChecked) {
        return total;  
    }
    
    // how many boats are ahead
    var idx = this.waypointSequence.indexOf(lastChecked);
    var nextWaypoint = this.waypointSequence.slice(idx+1, idx+2);
    var boatsAhead = nextWaypoint.reduce(function(ahead, waypoint) {
        return waypoint.getChecked();
    }, []);   
    
    return 1 + boatsAhead.length + lastChecked.checkedPosition(boat, boatsAhead);
};

Race.prototype.getTotal = function() {
    return this.world.queryObjects(BoatObject).length;
};

Race.prototype.hasFinished = function(boat) {
    return this.waypointSequence[this.waypointSequence.length - 1].hasChecked(boat);
};

/**
 * @returns {RaceStanding[]}
 */
Race.prototype.getStandings = function() {
    return this.standings;
}

/**
 * @param {BoatObject} boat
 * @param {Number} time
 * @constructor
 */
function RaceStanding(boat, time) {
    this.boat = boat;
    this.time = time;
}

/**
 * @returns {BoatObject}
 */
RaceStanding.prototype.getBoat = function() {
    return this.boat;
}

/**
 * @returns {Number}
 */
RaceStanding.prototype.getTime = function() {
    return this.time;
}