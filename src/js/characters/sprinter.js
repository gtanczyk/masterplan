/**
 * @param {GameWorld} world
 * @param {Race} race
 * @param {BoatObject} boat
 * @constructor
 * @extends {Character}
 */
function SprinterCharacter(world, race, boat) {
    Character.call(this, world, race, boat);
}

SprinterCharacter.prototype = Object.create(Character.prototype);

/**
 * @override
 */
SprinterCharacter.prototype.update = function() {
    Character.prototype.update.call(this);
};