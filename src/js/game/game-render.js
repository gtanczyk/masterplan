/**
 * 
 * @param {GameWorld} world
 * @param {Race} race
 */
function renderGame(world, race) {
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
    canvas.drawText(1, 50, race.getTime());
    
    world.queryObjects(BoatObject).forEach(function(boat) {
        canvas.drawText(1, 100, race.getWaypointCount(boat));
    });
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