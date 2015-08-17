/**
 * @param {BoatObject} boat to not get affected by this bonus
 * @param {Number} startTime when this bonus has been activated
 * @constructor
 * @extends {GameBonus}
 */
function ReverseVelocity(boat, startTime) {
    GameBonus.call(this, startTime);
    
    var oldGetVelocity = this.alter(BoatObject.prototype, BoatObject.prototype.getVelocity, function() {
        if (this === boat) {
            return oldGetVelocity.apply(this, arguments);
        } else {
            return oldGetVelocity.apply(this, arguments) * -1;
        }
    });
};

ReverseVelocity.prototype = Object.create(GameBonus.prototype);