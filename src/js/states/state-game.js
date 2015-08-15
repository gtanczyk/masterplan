var stateGame = function Game() {
    var world = new GameWorld();
    
    var boat = new BoatObject(0, 0, 0);
    var waypoint1 = new WaypointObject(200, 100, Math.PI / 3);
    var waypoint2 = new WaypointObject(600, 150, -Math.PI / 3);
    var bonus = new BonusObject(300, 300, 0);
    
    world.addObject(boat, waypoint1, waypoint2, bonus);
    
    var race = new Race(world);
    
    return function GameHandler(eventType, eventObject) {
        if (eventType == EVENT_RAF) {
            world.update(eventObject);
            renderGame(world);
        }
        
        if (eventType == EVENT_MOUSE_DOWN) {
            boat.targetVelocity = 10;
        }

        if (eventType == EVENT_MOUSE_UP) {
            boat.targetVelocity = 0;
        }

        if (eventType == EVENT_MOUSE_DOWN || eventType == EVENT_MOUSE_MOVE) {
            boat.targetDirection = Math.atan2(eventObject.y - boat.y, eventObject.x - boat.x);
        }
    }.State();
};