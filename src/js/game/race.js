function Race(world) {
    this.world = world;
    
    world.onCollision(BoatObject, WaypointObject, this.onWaypointCollision.bind(this));
    world.onCollision(BoatObject, BonusObject, this.onBonusCollision.bind(this));
};

Race.prototype.onWaypointCollision = function(boat, waypoint) {
    console.log("waypoint collision", boat, waypoint);
};

Race.prototype.onBonusCollision = function(boat, bonus) {
    console.log("bonus collision", boat, bonus);
};