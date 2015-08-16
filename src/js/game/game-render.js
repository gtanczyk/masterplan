/**
 * 
 * @param {GameWorld} world
 * @param {Race} race
 * @param {BoatObject} boat point of view
 */
function renderGame(world, race, boat) {
    /** {Canvas} */
    var canvas = getCanvas();
    
    // clear
    canvas.clear();
    
    // set camera
    canvas.save()
//        .rotate(camera.direction)
        .translate(-boat.getX(), -boat.getY())
        .translate(canvas.getWidth()/2, canvas.getHeight()/2)
    
    // render surface
    canvas.save()
        .fillStyle("blue")
        .fillRect(boat.getX() - canvas.getWidth()/2, boat.getY() - canvas.getHeight()/2, 
                canvas.getWidth(), canvas.getHeight())
        .restore();
    
    // render pointer
    /** {WaypointObect} */
    var waypoint = race.getNextWaypoint(boat);
    if (waypoint) {
        canvas.save()
              .translate(boat.getX(), boat.getY())
              .rotate(VMath.atan2(boat.vec(), waypoint.vec()))
              .translate(boat.getWidth()/2, 0)
              .fillRect(0, 0, Math.min(VMath.distance(boat.vec(), waypoint.vec()), 50), 10)
              .restore();
    }
    
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
        .rotate(object.getDirection());
    object.render(canvas);
    canvas.restore();
}