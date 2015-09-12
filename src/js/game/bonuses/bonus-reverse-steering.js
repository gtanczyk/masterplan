/**
 * @param {BoatObject} boat to not get affected by this bonus
 * @param {Number} startTime when this bonus has been activated
 * @constructor
 * @extends {GameBonus}
 */
function ReverseSteering(boat, startTime) {
    GameBonus.call(this, "Reversed steering", boat, startTime);
    
    var oldLeft = this.alter(BoatObject.prototype, BoatObject.prototype.turnLeft, function() {
        if (this === boat) {
            return oldLeft.apply(this, arguments);
        } else {
            return oldRight.apply(this, arguments);
        }
    });
    
    var oldRight = this.alter(BoatObject.prototype, BoatObject.prototype.turnRight, function() {
        if (this === boat) {
            return oldRight.apply(this, arguments);
        } else {
            return oldLeft.apply(this, arguments);
        }
    });
};

ReverseSteering.id = "steering";

ReverseSteering.prototype = Object.create(GameBonus.prototype);