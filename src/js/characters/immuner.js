/**
 * @param {GameWorld} world
 * @param {Race} race
 * @param {BoatObject} boat
 * @constructor
 * @extends {Character}
 */
function ImmunerCharacter(world, race, boat) {
    Character.call(this, world, race, boat);
}

ImmunerCharacter.prototype = Object.create(Character.prototype);

/**
 * @override
 */
ImmunerCharacter.prototype.update = function() {
    Character.prototype.update.call(this);
};

/**
 * @override
 */
ImmunerCharacter.prototype.straight = function() {
    this.boat.straight();
    
    if (this.bonusActive(ReverseVelocity)) {
        this.boat.moveBackwards();
    } else {
        this.boat.moveForward();
    }
};

/**
 * @override
 */
ImmunerCharacter.prototype.turnLeft = function() {
    if (this.bonusActive(ReverseSteering)) {
        this.boat.turnRight();
    } else {
        this.boat.turnLeft();
    }
};

/**
 * @override
 */
ImmunerCharacter.prototype.turnRight = function() {
    if (this.bonusActive(ReverseSteering)) {
        this.boat.turnLeft();
    } else {
        this.boat.turnRight();
    }
};

ImmunerCharacter.prototype.bonusActive = function(BonusClass) {
    return this.world.getActiveBonuses().reduce(function(r, bonus) {
        return bonus instanceof BonusClass ? !r : r;
    }, false)
};