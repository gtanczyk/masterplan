var lastTick = currentTime();
function updateAnimation() {
    var newTick = currentTime();
    updateState(EVENT_RAF, newTick - lastTick);
    lastTick = newTick;
    requestAnimationFrame(updateAnimation);
}

requestAnimationFrame(updateAnimation);

document.onreadystatechange = function() {
    updateState(EVENT_READYSTATE, document.readyState);
}