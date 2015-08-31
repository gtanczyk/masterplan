/**
 * @param {GameWorld} world
 * @param {Race} race
 * @param {BoatObject} boat
 * @param {GameHUD} HUD 
 * @constructor
 */
function stateGamePause(world, race, boat, HUD) {
    return function GamePauseHandler(eventType) {
        renderGame(world, race, boat);
        HUD.render(GAME_STATE_PAUSE);
        getCanvas().drawText(100, 100, "Press escape to resume");
        
        if (eventType == EVENT_ESCAPE || eventType == EVENT_TOUCH_START) {
            return stateGamePlay(world, race, boat, HUD);
        }
    }.State();
};