function renderGame(world) {
    var canvas = getCanvas();
    
    // clear
    canvas.clear();
    
    // render surface
    canvas.save()
        .fillStyle("blue")
        .fillRect(0, 0, canvas.getWidth(), canvas.getHeight())
        .restore();
    
    // render objects
    world.queryObjects().forEach(renderObject);
    
    // render status
    canvas.drawText(0, 0, "0/2");
};

function renderObject(object) {
    var canvas = getCanvas();
    
    canvas.save()
        .fillStyle("red")
        .translate(object.x, object.y)
        .rotate(object.direction)
        .translate(-object.width/2, -object.height/2)
        .fillRect(0, 0, object.width, object.height)
        .restore();
}