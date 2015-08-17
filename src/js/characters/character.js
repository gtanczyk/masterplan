/**
 * @param {GameWorld} world
 * @param {Race} race
 * @param {BoatObject} boat
 * @constructor
 */
function Character(world, race, boat) {
    this.world = world;
    this.race = race;
    this.boat = boat;
};

Character.prototype.update = function() {
    var waypoint = this.race.getNextWaypoint(this.boat);
    
    if (!waypoint) {
        this.boat.straight();
        return;
    }
    
    var direction = VMath.angle(
                        VMath.normalize(VMath.sub(waypoint.vec(), this.boat.vec())),
                        [Math.cos(this.boat.getDirection()), Math.sin(this.boat.getDirection())]
                    );
    if (Math.abs(direction) < VMath.EPSILON*10) {
        this.boat.straight();
    } else if (direction < 0) {
        this.boat.turnRight();
    } else {
        this.boat.turnLeft();
    }
};