/**
 * @constructor
 */
var stateGameInit = function GameInit() {
    var world = new GameWorld();
    
    var boat = new BoatObject(-300, 0, 0);
    var boat2 = new BoatObject(-300, -50, 0);
    var boat3 = new BoatObject(-300, -100, 0);
    
    var waypoints = [];
    var bonuses = [];
    
    var wx = 0, wy = 0;
    var wdir = Math.PI/2;
    for(var i = 0; i < 16; i++) {
        waypoints.push(new WaypointObject(wx, wy, wdir + Math.PI/2));
        bonuses.push(new BonusObject(
                wx + (Math.random() - Math.random()) * 50, 
                wy + (Math.random() - Math.random()) * 50, 0, 
                Math.random() < 0.5 ? ReverseSteering : ReverseVelocity))
        
        wx += Math.cos(wdir) * 300;
        wy += Math.sin(wdir) * 300;
        wdir += Math.cos(Math.PI / 16 * i) + (Math.random() - Math.random()) / 10;
    }
    
    world.addObject(boat, boat2, boat3);
    world.addObject.apply(world, waypoints);
    world.addObject.apply(world, bonuses);
    
    var race = new Race(world);
    
    race.orderWaypoints.apply(race, waypoints);

    race.addCharacter(new Character(world, race, boat2));
    race.addCharacter(new Character(world, race, boat3));

    return function GameInitHandler(eventType, eventObject) {
        renderGame(world, race, boat);
        getCanvas().drawText(0, 50, "GET READY")
        
        if (eventType == EVENT_TIMEOUT) {
            return new stateGamePlay(world, race, boat);
        }
    }.WeakState(2000);
};    