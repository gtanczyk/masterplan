function updateAnimation() {
    var lastTick = currentTime();
    updateState(EVENT_RAF, 0);
    requestAnimationFrame(updateAnimation);
}

requestAnimationFrame(updateAnimation);