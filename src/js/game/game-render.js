/**
 * 
 * @param {GameWorld} world
 * @param {Race} race
 */
function renderGame(world, race, camera) {
    var canvas = getCanvas();
    
    // clear
    canvas.clear();
    
    // set camera
    canvas.save()
//        .rotate(camera.direction)
        .translate(-camera.x, -camera.y)
        .translate(canvas.getWidth()/2, canvas.getHeight()/2)
    
    // render surface
    canvas.save()
        .fillStyle("blue")
        .fillRect(camera.x - canvas.getWidth()/2, camera.y - canvas.getHeight()/2, 
                canvas.getWidth(), canvas.getHeight())
        .restore();
    
    // render objects
    world.queryObjects().forEach(renderObject);
    
    canvas.restore();
    
    // render status
    canvas.drawText(1, 50, race.getTime());
    
    world.queryObjects(BoatObject).forEach(function(boat) {
        canvas.drawText(1, 100, race.getWaypointCount(boat));
    });
};

/**
 * @param {GameObject} object
 */
function renderObject(object) {
    var canvas = getCanvas();
    
    canvas.save()
        .fillStyle("red")
        .translate(object.getX(), object.getY())
        .rotate(object.getDirection())
        .translate(-object.getWidth()/2, -object.getHeight()/2)
        .fillRect(0, 0, object.getWidth(), object.getHeight())
        .restore();
}