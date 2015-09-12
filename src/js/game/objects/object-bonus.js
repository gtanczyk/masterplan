/**
 * @constructor
 * @extends {GameObject}
 */
function BonusObject(x, y, direction, bonus) {
    GameObject.call(this, x, y, 10, 10, direction);
    
    this.bonus = bonus;
    this.image= $("#asset-bonus-"+bonus.id);
};

BonusObject.prototype = Object.create(GameObject.prototype);

/**
 * @returns {GameBonus}
 */
BonusObject.prototype.getGameBonus = function() {
    return this.bonus;
};

/**
 * @param {Canvas} canvas
 */
BonusObject.prototype.render = function(canvas) {
    canvas.save()       
        .translate(-this.getWidth()/2, -this.getHeight()/2)
        .drawImage(this.image, 0, 0)
        .restore();
};
