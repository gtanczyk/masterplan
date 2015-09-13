/**
 * @param {GameWorld} world
 * @param {Race} race
 * @param {BoatObject} boat
 * @param {GameHUD} HUD 
 * @constructor
 */
function stateGamePause(world, race, boat, HUD) {
    var pauseScreen = $('#game-pause')
    
    pauseScreen.classList.add('visible');
    
    return function GamePauseHandler(eventType) {
        renderGame(world, race, boat);
        HUD.render(GAME_STATE_PAUSE);
        
        if (eventType == EVENT_ESCAPE || eventType == EVENT_TOUCH_START) {
            pauseScreen.classList.remove('visible');
            
            return stateGamePlay(world, race, boat, HUD);
        }
        
        if (eventType == EVENT_HASHCHANGE && eventObject == "") {
            pauseScreen.classList.remove('visible');
            world.destroy();
            HUD.destroy();
            
            return new stateIntro();
        }
    }.State();
};