/**
 * @constructor
 */
var stateIntro = function Intro() {
    var assets = [1,2,3].map(function(id) { 
        return $("#asset-about-"+id); 
    });
    
    var current = 0;
    
    return function IntroHandler(eventType) {
        if (eventType == EVENT_RAF) {
            getCanvas().drawImage(assets[current], 0, 0);
        }
        
        if (eventType == EVENT_KEY_DOWN || eventType == EVENT_MOUSE_DOWN || eventType == EVENT_TOUCH_START) {
            current++;
        }
        
        if (current >= assets.length) {
            return stateGameInit();
        }
    }.State();
};