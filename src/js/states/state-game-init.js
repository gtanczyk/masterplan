/**
 * @constructor
 */
var stateGameInit = function GameInit() {
    var world = new GameWorld();
    
    var boat = new BoatObject(0, 0, 0);
    var waypoint1 = new WaypointObject(200, 100, Math.PI / 3);
    var waypoint2 = new WaypointObject(600, 150, -Math.PI / 3);
    var waypoint3 = new WaypointObject(300, 200, -Math.PI / 3);
    var bonus1 = new BonusObject(300, 300, 0, ReverseSteering);
    var bonus2 = new BonusObject(200, 50, 0, ReverseVelocity);
    
    world.addObject(boat, waypoint1, waypoint2, waypoint3, bonus1, bonus2);
    
    var race = new Race(world);
    
    race.orderWaypoints(waypoint1, waypoint2, waypoint3);
    
    return function GameInitHandler(eventType, eventObject) {
        renderGame(world, race, boat);
        getCanvas().drawText(0, 50, "GET READY")
        
        if (eventType == EVENT_TIMEOUT) {
            return new stateGamePlay(world, race, boat);
        }
    }.WeakState(5000);
};    