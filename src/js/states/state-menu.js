var stateMenu = function Menu() {
    return function MenuHandler(eventType) {
        if (eventType == EVENT_RAF) {
            getCanvas().clear();
            getCanvas().drawText("MENU");
        }
        
        if (eventType == EVENT_MENU_PLAY) {
            return stateGame();
        }
    }.State();
};