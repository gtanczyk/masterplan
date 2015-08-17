/**
 * @param {GameWorld} world
 * @param {Race} race
 * @param {BoatObject} boat
 * @constructor
 * @extends {Character}
 */
function AnnoyingCharacter(world, race, boat) {
    Character.call(this, world, race, boat);
}

AnnoyingCharacter.prototype = Object.create(Character.prototype);

/**
 * @override
 */
AnnoyingCharacter.prototype.update = function() {
    /** @type {WaypointObject} */
    var waypoint = this.race.getNextWaypoint(this.boat);
    var nextVec = (waypoint || this.boat).vec();
    /** @type {BoatObject[]} */
    var boats = this.world.queryObjects(BoatObject, nextVec[0], nextVec[1], 50)
                    .filter(function(boat) {
                        return this.boat !== boat;
                    }, this);
    if(boats.length > 0) {
        this.goTo(boats[0].vec());
    } else {
        Character.prototype.update.call(this, waypoint);
    }
};