/**
 * @constructor
 */
var stateIntro = function Intro() {
    var current = 0;
    
    var gameIntro = $('#game-intro');
    gameIntro.classList.add('visible');
    
    return function IntroHandler(eventType) {
//        if (eventType == EVENT_RAF) {
//            getCanvas().drawImage(assets[current], 0, 0);
//        }
        
        if (eventType == EVENT_KEY_DOWN || eventType == EVENT_MOUSE_DOWN || eventType == EVENT_TOUCH_START) {
            current++;
            if (isTouchDevice()) {
                requestFullScreen();
            }
        }
        
        if (current >= 1) {
            gameIntro.classList.remove('visible');
            
            return stateGameInit();
        }
    }.State();
};