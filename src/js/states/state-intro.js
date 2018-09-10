/**
 * @constructor
 */
var stateIntro = function Intro() {
    var gameIntro = $('#game-intro');
    gameIntro.classList.add('visible');

    var hints = [
        "Protect your archers, the more they live the more they kill.",
        "Consider putting tanks in first line, they will stop the first wave.",
        "Sending tanks or warriors later may (not) be a good tactic.",
        "Make sure you don't spread too thin, or the enemy will gain advantage very fast.",
        "Getting to enemy archers quickly may give you easy win.",
        "Warriors are good for flanking maneuvers.",
        "Melee warriors supported by archers can smash enemy front line very quickly.",
        "Archers are most effective against stationary opponents.",
        "Army of Warriors is effective and lame!",
        "All units are most vulnerable when hit from behind.",
        "A surrounded tank is certainly dead within milliseconds."
    ];

    $('#hint').innerHTML = "<b>Hint:</b> " + hints[Math.random() * hints.length << 0];
    
    return function IntroHandler(eventType, eventObject) {
        if (eventType === EVENT_MOUSE_CLICK && eventObject.target.tagName === 'BUTTON') {
            gameIntro.classList.remove('visible');
            return new stateGameDesigner();
        }
    }.State();
};
