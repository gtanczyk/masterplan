/**
 * @param {GameWorld} world
 * @param {Race} race
 * @param {BoatObject} boat
 * @constructor
 * @extends {Character}
 */
function BonuserCharacter(world, race, boat) {
    Character.call(this, world, race, boat);
}

BonuserCharacter.prototype = Object.create(Character.prototype);

/**
 * @override
 */
BonuserCharacter.prototype.update = function() {
    /** @type {WaypointObject} */
    var waypoint = this.race.getNextWaypoint(this.boat);
    var nextVec = (waypoint || this.boat).vec();
    /** @type {GameBonus[]} */
    var bonuses = this.world.queryObjects(BonusObject, nextVec[0], nextVec[1], 250);
    if(bonuses.length > 0) {
        this.goTo(bonuses[0].vec());
    } else {
        Character.prototype.update.call(this, waypoint);
    }
};