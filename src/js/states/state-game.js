var stateGame = function Game() {
    var world = new GameWorld();
    
    var myObject = { 
        x: 50, y: 50,
        vx : 0, vy: 0,
        height: 25, width: 50, 
        direction: 0,
        targetDirection: 0
    };
    
    world.addObject(myObject);
    
    return function GameHandler(eventType, eventObject) {
        if (eventType == EVENT_RAF) {
            world.update(eventObject);
            renderGame(world);
        }
        
        if (eventType == EVENT_MOUSE_DOWN || eventType == EVENT_MOUSE_MOVE) {
            myObject.targetDirection = Math.atan2(eventObject.y - myObject.y, eventObject.x - myObject.x);
        }
    }.State();
};