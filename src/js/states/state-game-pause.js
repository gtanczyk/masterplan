/**
 * @constructor
 */
var stateGamePause = function GamePause(world, race, boat) {
    return function GamePauseHandler(eventType) {
        renderGame(world, race, boat);
        getCanvas().drawText(0, 50, "PAUSE")
        
        if (eventType == EVENT_ESCAPE) {
            return stateGamePlay(world, race, boat);
        }
    }.State();
};