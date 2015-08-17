/**
 * @constructor
 * @extends {GameObject}
 */
function BoatObject(name, x, y, direction) {
    GameObject.call(this, x, y, 32, 32, direction);
    
    this.name = name;
    
    this.velocity = 0;
    this.targetVelocity = 1;
    
    this.force = [0, 0];
    
    this.targetDirection = direction;
    this.turnDirection = 0;
    
    this.waypointsChecked = [];
    
    this.image = $("#asset-boat");
    this.leftOarAnim = 0;
    this.rightOarAnim = 0;
}

BoatObject.prototype = Object.create(GameObject.prototype);

BoatObject.prototype.getName = function() {
    return this.name;
};

/**
 * @param {Canvas} canvas
 */
BoatObject.prototype.render = function(canvas) {
    canvas.save()       
        .translate(-this.getWidth()/2, -this.getHeight()/2)
        .drawImage(this.image, 0, 0)
        .restore();
    
    // oars
    canvas.save()
        .translate(0, 13)
        .rotate(Math.cos(Math.PI * this.leftOarAnim))
        .fillRect(0, -this.getWidth()*0.3, 2, this.getWidth() * 1)
        .restore().save()
        .translate(0, -13)
        .rotate(-Math.cos(Math.PI * this.rightOarAnim))
        .fillRect(0, this.getWidth()*0.3, 2, this.getWidth() * -1)
        .restore();
};

// checkpoints 
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

// controls
BoatObject.prototype.turnLeft = function() {
    this.turnDirection = -1;
};

BoatObject.prototype.turnRight = function() {
    this.turnDirection = 1;
};

BoatObject.prototype.straight = function() {
    this.turnDirection = 0;
};

// update
BoatObject.prototype.updateVelocity = function(deltaTime) {
    this.velocity = this.getTargetVelocity() * deltaTime + this.velocity * (1 - deltaTime);
};

BoatObject.prototype.getTargetVelocity = function() {
    return this.targetVelocity;
};

BoatObject.prototype.getVelocity = function() {
    return this.velocity;
};

BoatObject.prototype.update = function(deltaTime) {
    this.updateVelocity(deltaTime);
    
    this.setX(this.x + this.force[0] * deltaTime);
    this.setY(this.y + this.force[1] * deltaTime);
    
    // turn
    this.targetDirection += deltaTime * this.turnDirection / 10;
    
    // rotate object
    var cx = Math.cos(this.getDirection()) * (1 - deltaTime),
        cy = Math.sin(this.getDirection()) * (1 - deltaTime);
    var dx = Math.cos(this.targetDirection) * deltaTime,
        dy = Math.sin(this.targetDirection) * deltaTime;
    this.setDirection(Math.atan2(cy + dy, cx + dx));
    
    // degrade force
    this.force = VMath.sub(this.force, VMath.scale(this.force, deltaTime*0.1));
    if (VMath.length(this.force) < VMath.EPSILON) {
        this.force = [0, 0];
    }
    
    // animate oars
    if (this.turnDirection <= 0) {
        this.leftOarAnim = this.updateOar(this.leftOarAnim, this.rightOarAnim, deltaTime);
        
    }
    if (this.turnDirection >= 0) {
        this.rightOarAnim = this.updateOar(this.rightOarAnim, this.leftOarAnim, deltaTime);
    }
};

BoatObject.prototype.updateOar = function(anim, oppositeAnim, deltaTime) {
    var velocity = this.getVelocity();
    var scale = this.turnDirection == 0 && anim - oppositeAnim > 0.1 ? 0.5 : 1;
    anim = anim + deltaTime / 100 * velocity * scale * 10;
    if (Math.abs(anim) > 1) {
        this.addForce(VMath.scale([Math.cos(this.direction), Math.sin(this.direction)], velocity*deltaTime/2));
        anim %= 2;
    }
    return anim;
};

BoatObject.prototype.addForce = function(vec) {
    this.force = VMath.add(this.force, vec);
}