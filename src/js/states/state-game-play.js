/**
 * @constructor
 */
var stateGamePlay = function GamePlay(world, race, boat) {
    return function GamePlayHandler(eventType, eventObject) {
        if (eventType == EVENT_RAF) {
            world.update(eventObject);
            race.update();
            renderGame(world, race, boat);
        }
        
        if (eventType == EVENT_ARROW_LEFT_DOWN) {
            boat.turnLeft();
        }
        if (eventType == EVENT_ARROW_RIGHT_DOWN) {
            boat.turnRight();
        }
        if (eventType == EVENT_ARROW_LEFT_UP || eventType == EVENT_ARROW_RIGHT_UP) {
            boat.straight();
        }
        
        if (eventType == EVENT_RACE_OVER) {
            return new stateGameEnd(world, race, boat);
        }
        
        if (eventType == EVENT_ESCAPE) {
            return new stateGamePause(world, race, boat);
        }

    }.State();
};