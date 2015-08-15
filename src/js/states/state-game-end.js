/**
 * @constructor
 */
var stateGameEnd = function GameEnd(world, race, boat) {
    return function GameEndHandler(eventType) {
        renderGame(world, race, boat);
        getCanvas().drawText(0, 50, "RACE OVER")
        
        if (eventType == EVENT_ESCAPE) {
            return stateMenu();
        }
    }.State();
};