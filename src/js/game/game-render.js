function renderGame(world) {
    /** {Canvas} */
    var canvas = getCanvas(LAYER_DEFAULT);
    
    // clear
    canvas.clear();

    // set camera
    canvas.save()
        .translate(canvas.getWidth()/2, canvas.getHeight()/2)

    // world edge
    canvas.arc(0, 0, world.getEdgeRadius());
    
    // render dead bodies
    world.queryObjects(SoldierObject, soldier => soldier.life === 0).forEach(renderObject);

    // render soldiers
    world.queryObjects(SoldierObject, soldier => soldier.life > 0).forEach(renderObject);

    // render other objects
    world.queryObjects(GameObject, object => !(object instanceof SoldierObject)).forEach(renderObject);
    
    canvas.restore();
};

/**
 * @param {GameObject} object
 */
function renderObject(object) {
    var canvas = getCanvas();
    
    canvas.save()
        .fillStyle("red")
        .translate(object.getX(), object.getY())
        .rotate(object.getDirection());
    object.render(canvas);
    canvas.restore();
}

function renderSurface() {
    /** {Canvas} */
    var waterCanvas = getCanvas(LAYER_WATER);

    waterCanvas.save()
        .fillStyle("#5599ff")
        .fillRect(0, 0, 
                waterCanvas.getWidth(), waterCanvas.getHeight())
        .restore();
}