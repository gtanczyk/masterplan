var stateIntro = function Intro() {
    return function IntroHandler(eventType) {
        if (eventType === EVENT_TIMEOUT) {
            return stateMenu();
        }
    }.WeakState(1000);
};