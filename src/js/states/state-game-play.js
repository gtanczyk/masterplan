/**
 * @param {GameWorld} world
 * @param {Race} race
 * @param {BoatObject} boat
 * @param {GameHUD} HUD 
 * @constructor
 */
function stateGamePlay(world, race, boat, HUD) {
    return function GamePlayHandler(eventType, eventObject) {
        if (eventType == EVENT_RAF) {
            var elapsedTime = eventObject;
            while (elapsedTime > 0) {
                elapsedTime = world.update(elapsedTime);
                race.update();
            }

            renderGame(world, race, boat);
            HUD.render(GAME_STATE_PLAY);
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
            return new stateGameEnd(world, race, boat, HUD);
        }
        
        if (eventType == EVENT_ESCAPE || eventType == EVENT_DOCUMENT_HIDDEN) {
            return new stateGamePause(world, race, boat, HUD);
        }

    }.State();
};