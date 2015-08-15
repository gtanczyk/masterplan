/**
 * @param {BoatObject} boat to not get affected by this bonus
 * @param {Number} startTime when this bonus has been activated
 * @constructor
 */
function ReverseVelocity(boat, startTime) {
    this.startTime = startTime;
    var oldGetVelocity = this.oldGetVelocity = BoatObject.prototype.getVelocity;
    
    BoatObject.prototype.getVelocity = function() {
        if (this === boat) {
            return oldGetVelocity.apply(this, arguments);
        } else {
            return oldGetVelocity.apply(this, arguments) * -1;
        }
    };
};

ReverseVelocity.prototype.isActive = function(worldTime) {
    return worldTime < this.startTime + this.getDuration();
};

ReverseVelocity.prototype.getDuration = function() {
    return 5000;
};

ReverseVelocity.prototype.deactivate = function() {
    BoatObject.prototype.getVelocity = this.oldGetVelocity;
};