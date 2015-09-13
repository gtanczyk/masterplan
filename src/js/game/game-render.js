/**
 * 
 * @param {GameWorld} world
 * @param {Race} race
 * @param {BoatObject} boat point of view
 */
function renderGame(world, race, boat) {
    /** {Canvas} */
    var canvas = getCanvas(LAYER_DEFAULT);
    
    // clear
    canvas.clear();
    
    // set camera
    canvas.save()
        .translate(-boat.getX(), -boat.getY())
        .translate(canvas.getWidth()/2, canvas.getHeight()/2)
        
    renderWaves(canvas, world);
    
    // render pointer
    /** {WaypointObect} */
    var waypoint = race.getNextWaypoint(boat);
    if (waypoint) {
          // draw arrow
        canvas.save()
              .fillStyle("rgba(255,255,255,0.7)")
              .translate(boat.getX(), boat.getY())
              .rotate(VMath.atan2(boat.vec(), waypoint.vec()))
              .translate(boat.getWidth()/2, 0)
              .drawImage($("#asset-waypoint-arrow"), 0, -16)
              .restore()
          // highlight waypoint
              .save()
              .strokeStyle("rgba(255,255,255,0.7)")
              .translate(waypoint.getX(), waypoint.getY())
              .arc(0, 0, Math.min(VMath.distance(boat.vec(), waypoint.vec()), 100))
              .restore();
    }
    
    // render objects
    world.queryObjects().forEach(renderObject);
    
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

/**
 * @param {Canvas} canvas 
 * @param {GameWorld} world
 */
function renderWaves(canvas, world) {
    /** {Canvas} */
    var canvas = getCanvas(LAYER_DEFAULT);

    world.getWaves().forEach(function(wave) {
        var alpha = 1 - wave[2] / WAVE_LENGTH;
        canvas.save()
             .strokeStyle("rgba(255,255,255,"+alpha+")")
             .translate(wave[0], wave[1])
             .arc(0, 0, wave[2])
             .restore();
    });
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