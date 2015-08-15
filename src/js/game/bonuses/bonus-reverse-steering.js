/**
 * @param {BoatObject} boat to not get affected by this bonus
 * @param {Number} startTime when this bonus has been activated
 */
function ReverseSteering(boat, startTime) {
    this.startTime = startTime;
    var oldLeft = this.oldLeft = BoatObject.prototype.turnLeft;
    var oldRight = this.oldRight = BoatObject.prototype.turnRight;
    
    BoatObject.prototype.turnLeft = function() {
        if (this === boat) {
            return oldLeft.apply(this, arguments);
        } else {
            return oldRight.apply(this, arguments);
        }
    };
    BoatObject.prototype.turnRight = function() {
        if (this === boat) {
            return oldRight.apply(this, arguments);
        } else {
            return oldLeft.apply(this, arguments);
        }
    };
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