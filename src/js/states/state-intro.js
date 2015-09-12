/**
 * @constructor
 */
var stateIntro = function Intro() {
    var current = 0;
    
    var gameIntro = $('#game-intro');
    gameIntro.style.display = 'block';
    
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
            gameIntro.style.display = 'none';
            
            return stateGameInit();
        }
    }.State();
};