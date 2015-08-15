var stateGame = function Game() {
    return function GameHandler(eventType) {
        if (eventType == EVENT_MENU_PLAY) {
            return stateGame();
        }
    }.State();
};