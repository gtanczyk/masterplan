window.addEventListener("keydown", function(event) {
    if (event.keyCode == 37) {
        updateState(EVENT_ARROW_LEFT_DOWN);
    }
    if (event.keyCode == 38) {
        updateState(EVENT_ARROW_UP_DOWN);
    }
    if (event.keyCode == 39) {
        updateState(EVENT_ARROW_RIGHT_DOWN);
    }
    if (event.keyCode == 40) {
        updateState(EVENT_ARROW_DOWN_DOWN);
    }
    if (event.keyCode == 27) {
        updateState(EVENT_ESCAPE);
    }
    updateState(EVENT_KEY_DOWN, event.keyCode);
});

window.addEventListener("keyup", function(event) {
    if (event.keyCode == 37) {
        updateState(EVENT_ARROW_LEFT_UP);
    }
    if (event.keyCode == 38) {
        updateState(EVENT_ARROW_UP_UP);
    }
    if (event.keyCode == 39) {
        updateState(EVENT_ARROW_RIGHT_UP);
    }
    if (event.keyCode == 40) {
        updateState(EVENT_ARROW_DOWN_UP);
    }
    updateState(EVENT_KEY_UP, event.keyCode);

});

// mouse events

window.addEventListener("mousedown", function(event) {
    updateState(EVENT_MOUSE_DOWN, event);
    
    event.preventDefault();
});

window.addEventListener("mouseup", function(event) {
    updateState(EVENT_MOUSE_UP, event);
    
    event.preventDefault();
});

window.addEventListener("mousemove", function(event) {
    updateState(EVENT_MOUSE_MOVE, event);
    
    event.preventDefault();
});

window.addEventListener("click", function(event) {
    updateState(EVENT_MOUSE_CLICK, event);
    
    event.preventDefault();
});


// touch events, translate them to appropiate keyboard/mouse events

function handleTouch(event) {
    var touch = event.touches[0];
    updateState(EVENT_MOUSE_DOWN, { x: touch.pageX, y: touch.pageY });
    if (touch.pageX / window.innerWidth < 0.33) {
        updateState(EVENT_ARROW_LEFT_DOWN);
    } else if (touch.pageX / window.innerWidth > 0.66) {
        updateState(EVENT_ARROW_RIGHT_DOWN);
    } 
    
    if (touch.pageY / window.innerHeight < 0.33) {
        updateState(EVENT_ARROW_UP_DOWN);
    } else if (touch.pageY / window.innerHeight > 0.66) {
        updateState(EVENT_ARROW_DOWN_DOWN);
    }

    event.preventDefault();
}

window.addEventListener("touchstart", function(event) {
    handleTouch(event);
    
    updateState(EVENT_TOUCH_START);
});

window.addEventListener("touchmove", handleTouch);

window.addEventListener("touchend", function(event) {
    var touch = event.touches[0];
    updateState(EVENT_MOUSE_UP);
    updateState(EVENT_ARROW_LEFT_UP);
    updateState(EVENT_ARROW_RIGHT_UP);
    updateState(EVENT_ARROW_DOWN_UP);

    event.preventDefault();
});