var stateGame = function Game() {
    var world = new GameWorld();
    
    var boat = new BoatObject(0, 0, 0);
    var waypoint1 = new WaypointObject(200, 100, Math.PI / 3);
    var waypoint2 = new WaypointObject(600, 150, -Math.PI / 3);
    var waypoint3 = new WaypointObject(300, 200, -Math.PI / 3);
    var bonus = new BonusObject(300, 300, 0);
    
    world.addObject(boat, waypoint1, waypoint2, waypoint3, bonus);
    
    var race = new Race(world);
    
    race.orderWaypoints(waypoint1, waypoint2, waypoint3);
    
    return function GameHandler(eventType, eventObject) {
        if (eventType == EVENT_RAF) {
            world.update(eventObject);
            race.update(eventObject);
            renderGame(world, race);
        }
        
        if (eventType == EVENT_ARROW_LEFT_DOWN) {
            boat.turnLeft();
        }
        if (eventType == EVENT_ARROW_RIGHT_DOWN) {
            boat.turnRight();
        }
        if (eventType == EVENT_ARROW_LEFT_UP || eventType == EVENT_ARROW_LEFT_UP) {
            boat.straight();
        }

    }.State();
};