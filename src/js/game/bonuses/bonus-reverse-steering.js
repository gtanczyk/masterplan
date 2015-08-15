function ReverseSteering(startTime) {
    this.startTime = startTime;
    this.oldLeft = BoatObject.prototype.turnLeft;
    this.oldRight = BoatObject.prototype.turnRight;
    
    BoatObject.prototype.turnLeft = this.oldRight;
    BoatObject.prototype.turnRight = this.oldLeft;
};

ReverseSteering.prototype.isActive = function(worldTime) {
    return worldTime < this.startTime + this.getDuration();
};

ReverseSteering.prototype.getDuration = function() {
    return 5000;
};

ReverseSteering.prototype.deactivate = function() {
    BoatObject.prototype.turnLeft = this.oldLeft;
    BoatObject.prototype.turnRight = this.oldRight;
};