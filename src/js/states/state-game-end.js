/**
 * @param {GameWorld} world
 * @param {Race} race
 * @param {BoatObject} boat
 * @param {GameHUD} HUD 
 * @constructor
 */
function stateGameEnd(world, race, boat, HUD) {
    return function GameEndHandler(eventType) {
        renderGame(world, race, boat);
        HUD.render(GAME_STATE_END);
        
        if (eventType == EVENT_ESCAPE) {
            world.destroy();
            HUD.destroy();
            
            return stateMenu();
        }
    }.State();
};