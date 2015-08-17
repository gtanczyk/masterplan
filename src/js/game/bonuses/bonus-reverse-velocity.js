/**
 * @param {BoatObject} boat to not get affected by this bonus
 * @param {Number} startTime when this bonus has been activated
 * @constructor
 * @extends {GameBonus}
 */
function ReverseVelocity(boat, startTime) {
    GameBonus.call(this, "Reversed velocity", boat, startTime);
    
    var oldGetTargetVelocity = this.alter(BoatObject.prototype, BoatObject.prototype.getTargetVelocity, function() {
        if (this === boat) {
            return oldGetTargetVelocity.apply(this, arguments);
        } else {
            return oldGetTargetVelocity.apply(this, arguments) * -1;
        }
    });
};

ReverseVelocity.prototype = Object.create(GameBonus.prototype);