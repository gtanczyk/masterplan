/**
 * @constructor
 */
var stateIntro = function Intro() {
    var gameIntro = $('#game-intro');
    gameIntro.classList.add('visible');
    
    return function IntroHandler(eventType, eventObject) {
        gameIntro.classList.remove('visible');
        return stateGameDesigner();

        if (eventType == EVENT_KEY_DOWN) {
            switch (String.fromCharCode(eventObject)) {
                case "1": return stateGameDesignerInit();
                case "2": return stateGameBattleInit();
                default: break;
            }
        }
    }.State();
};