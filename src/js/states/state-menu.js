/**
 * @constructor
 */
var stateMenu = function Menu() {
    return function MenuHandler(eventType) {
        if (eventType == EVENT_RAF) {
            getCanvas().clear();
            getCanvas().drawText(0, 50, "MENU");
        }
        
        if (eventType == EVENT_MENU_PLAY) {
            return stateGame();
        }
    }.State();
};