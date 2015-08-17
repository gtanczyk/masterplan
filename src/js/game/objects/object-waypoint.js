/**
 * @constructor
 */
function WaypointObject(x, y, direction) {
    GameObject.call(this, x, y, 50, 0, direction);
    
    this.leftEdge = new WaypointEdgeObject(this.leftVec());
    this.rightEdge = new WaypointEdgeObject(this.rightVec());
    
    this.boatsChecked = [];
};

WaypointObject.prototype = Object.create(GameObject.prototype);

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
WaypointObject.prototype.hasChecked = function(boat) {
    return this.boatsChecked.indexOf(boat) > -1;
};

WaypointObject.prototype.countChecked = function() {
    return this.boatsChecked.length;
};

/**
 * @param {BoatObject} boat
 */
WaypointObject.prototype.checkBoat = function(boat) {
    if (!this.hasChecked(boat)) {
        this.boatsChecked.push(boat);
        boat.checkWaypoint(this);
    }
};

/**
 * @param {Canvas} canvas
 */
WaypointObject.prototype.render = function(canvas) {
    canvas.fillStyle("yellow").fillRect(-this.getWidth()/2, 0, 10, 10);
    canvas.fillStyle("purple").fillRect(this.getWidth()/2, 0, 10, 10);
};

WaypointObject.prototype.leftVec = function() {
    return VMath.sub(this.vec(), VMath.rotate([0, this.getWidth()/2], this.getDirection() + Math.PI/2));
};

WaypointObject.prototype.rightVec = function() {
    return VMath.sub(this.vec(), VMath.rotate([0, this.getWidth()/2], this.getDirection() - Math.PI/2));
};

WaypointObject.prototype.getLeftEdge = function() {
    return this.leftEdge;
};

WaypointObject.prototype.getRightEdge = function() {
    return this.rightEdge;
};