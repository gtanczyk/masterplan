/**
 * @constructor
 */
function WaypointEdgeObject(vec) {
    this.x = vec[0];
    this.y = vec[1];
};

WaypointEdgeObject.prototype = Object.create(GameObject.prototype);