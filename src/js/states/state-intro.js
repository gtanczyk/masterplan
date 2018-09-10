/**
 * @constructor
 */
var stateIntro = function Intro() {
    var gameIntro = $('#game-intro');
    gameIntro.classList.add('visible');
    
    return function IntroHandler(eventType, eventObject) {
        if (eventType === EVENT_MOUSE_CLICK && eventObject.target.tagName === 'BUTTON') {
            gameIntro.classList.remove('visible');
            return new stateGameDesigner();
        }
    }.State();
};
