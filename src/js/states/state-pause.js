var statePause = function Pause() {
    return function PauseHandler(eventType) {
        if (eventType == EVENT_MENU_PLAY) {
            return stateGame();
        }
    }.State();
};