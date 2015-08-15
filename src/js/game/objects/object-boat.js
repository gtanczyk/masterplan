function BoatObject(x, y, direction) {
    GameObject.call(this, x, y, 50, 25, direction);
    
    this.vx = 0;
    this.vy = 0;
    
    this.velocity = 0;
    this.targetVelocity = 0;
    
    this.targetDirection = direction;
    this.waypointsChecked = [];
}

BoatObject.prototype.checkWaypoint = function (waypoint) {
    if (!this.hasChecked(waypoint)) {
        this.waypointsChecked.push(waypoint);
    }
};

BoatObject.prototype.hasChecked = function (waypoint) {
    return this.waypointsChecked.indexOf(waypoint) > -1;
};

BoatObject.prototype.getWaypoints = function() {
    return this.waypointsChecked;
};

BoatObject.prototype.update = function(deltaTime) {
    this.velocity = this.targetVelocity * deltaTime + this.velocity * (1 - deltaTime);
    
    this.vx = Math.cos(this.direction) * this.velocity;
    this.vy = Math.sin(this.direction) * this.velocity;
    
    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
    
    // rotate object
    var cx = Math.cos(this.direction) * (1 - deltaTime),
        cy = Math.sin(this.direction) * (1 - deltaTime);
    var dx = Math.cos(this.targetDirection) * deltaTime
        dy = Math.sin(this.targetDirection) * deltaTime;
    this.direction = Math.atan2(cy + dy, cx + dx);
};