window.addEventListener("touchstart", function(event) {
    var touch = event.touches[0];
    updateState(EVENT_MOUSE_DOWN, { x: touch.pageX, y: touch.pageY });

    event.preventDefault();
});

window.addEventListener("touchmove", function(event) {
    var touch = event.touches[0];
    updateState(EVENT_MOUSE_MOVE, { x: touch.pageX, y: touch.pageY });

    event.preventDefault();
});

window.addEventListener("touchend", function(event) {
    updateState(EVENT_MOUSE_UP);

    event.preventDefault();
});

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
})