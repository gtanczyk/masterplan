/**
 * @constructor
 */
function BonusObject(x, y, direction, bonus) {
    GameObject.call(this, x, y, 10, 10, direction);
    
    this.bonus = bonus;
};

BonusObject.prototype = Object.create(GameObject.prototype);

/**
 * @returns {GameBonus}
 */
BonusObject.prototype.getGameBonus = function() {
    return this.bonus;
};