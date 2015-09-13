/**
 * @constructor
 */
function stateGameInit() {
    document.location.hash = 'play';
    
    var world = new GameWorld();
    
    var boat = new BoatObject('You', -400, -200, 0, world);
    boat.setDrawHUD(true);
    
    var boat2 = new BoatObject('Sprinter', -400, -150, 0, world);
    var boat3 = new BoatObject('Bonuser', -350, -200, 0, world);
    var boat4 = new BoatObject('Immuner', -350, -150, 0, world);
    var boat5 = new BoatObject('Annoying', -300, -200, 0, world);
    var boat6 = new BoatObject('Predator', -300, -150, 0, world);
    
    var waypoints = [];
    var bonuses = [];
    
    var wx = 0, wy = 0;
    var wdir = Math.PI/6;
    for(var i = 0; i < 16; i++) {
        waypoints.push(new WaypointObject(wx, wy, wdir + Math.PI/2));
        var bdir = wdir + Math.PI * Math.random();
        bonuses.push(new BonusObject(
                wx + Math.sign(Math.random() - Math.random()) * 150 * Math.cos(bdir), 
                wy + Math.sign(Math.random() - Math.random()) * 150 * Math.sin(bdir), 0, 
                Math.random() < 0.5 ? ReverseSteering : ReverseVelocity))
        
        wx += Math.cos(wdir) * 300;
        wy += Math.sin(wdir) * 300;
        wdir += Math.cos(Math.PI / 16 * i) + (Math.random() - Math.random()) / 10;
    }
    
    world.addObject(boat, boat2, boat3, boat4, boat5, boat6);
    world.addObject.apply(world, waypoints);
    world.addObject.apply(world, bonuses);
    
    var race = new Race(world);
    
    race.orderWaypoints.apply(race, waypoints);

//    race.addCharacter(new Character(world, race, boat));
    race.addCharacter(new SprinterCharacter(world, race, boat2));
    race.addCharacter(new BonuserCharacter(world, race, boat3));
    race.addCharacter(new ImmunerCharacter(world, race, boat4));
    race.addCharacter(new AnnoyingCharacter(world, race, boat5));
    race.addCharacter(new Character(world, race, boat6));
    
    var HUD = new GameHUD(race, world, boat);

    return function GameInitHandler(eventType, eventObject) {
        renderGame(world, race, boat, HUD);
        HUD.render(GAME_STATE_INIT);
        
        if (eventType == EVENT_TIMEOUT) {
            return new stateGamePlay(world, race, boat, HUD);
        }
        
        if (eventType == EVENT_HASHCHANGE && eventObject == "") {
            return new stateIntro();
        }
    }.WeakState(2000);
};    