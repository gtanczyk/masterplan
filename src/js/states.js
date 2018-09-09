/**
 * State machine
 */

Function.prototype.State = function() {
    var handler = this;
    
    return handler;
}

var stateTimeout;
Function.prototype.WeakState = function(timeLimit) {
    var handler = this.State();
    
    if (stateTimeout) {
        clearTimeout(stateTimeout);
    }
    
    timeout = setTimeout(function() {
        if (currentState === handler) {
            updateState(EVENT_TIMEOUT);
            timeout = NULL;
        }
    }, timeLimit);
    
    return handler;
}

/**
 * Initial state
 * @constructor
 */
var stateInit = function Init() {
    return function InitHandler(eventType, eventObject) {
        if (eventType == EVENT_READYSTATE && eventObject == "complete") {
            return stateIntro();
        }
    }.State()
};

/**
 * Event processing
 */
var currentState = stateInit();
function updateState(eventType, eventObject) {
    var nextState = currentState(eventType, eventObject);
    
    if (!nextState) {
        return;
    }
    
    if (nextState !== currentState) {
        if (DEBUG) {
            console.log("Transition from " + currentState.name + " to " + nextState.name);
        }
        
        currentState = nextState;
    }
}

setInterval(() => updateState(EVENT_INTERVAL_100MS), 100);
setInterval(() => updateState(EVENT_INTERVAL_SECOND), 1000);

