function WaypointObject(x, y, direction) {
    GameObject.call(this, x, y, 50, 50, direction);
    this.boatsChecked = [];
};

WaypointObject.prototype.update = function(deltaTime) {
    
};

/**
 * @param {BoatObject} boat
 * @param {WaypointObject[]} sequence
 */
WaypointObject.prototype.canCheck = function(boat, sequence) {
    return sequence.slice(0, sequence.indexOf(this)).every(function(waypoint) {
        return boat.hasChecked(waypoint);
    });
};

/**
 * @param {BoatObject} boat
 */
WaypointObject.prototype.checkBoat = function(boat) {
    if (this.boatsChecked.indexOf(boat) == -1) {
        this.boatsChecked.push(boat);
        boat.checkWaypoint(this);
    }
};