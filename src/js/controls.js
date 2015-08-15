document.addEventListener("mousedown", function(event) {
    updateState(EVENT_MOUSE_DOWN, event);
});

document.addEventListener("mouseup", function(event) {
    updateState(EVENT_MOUSE_UP, event);
});

document.addEventListener("mousemove", function(event) {
    updateState(EVENT_MOUSE_MOVE, event);
})