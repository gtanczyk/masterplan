/** @define {boolean} */
var DEBUG = true;

/** @const */
var NULL = null;
/** @const */
var TRUE = true;
/** @const */
var FALSE = false;

/** const */
var MIN_TICK = 10;
var UPDATE_TICK = 100;

/** @const */
var GAME_STATE_INIT = 0;
/** @const */
var GAME_STATE_BATTLE_INIT = 1;
/** @const */
var GAME_STATE_PAUSE = 2;
/** @const */
var GAME_STATE_END = 3;

/** @const */
var LAYER_DEFAULT = 'layer-default';

/** @const */
var TYPE_ARCHER = 16;

/** @const */
var TYPE_WARRIOR = 17;

/** @const */
var TYPE_TANK = 18;

/** @const */
const EDGE_RADIUS = 800;

/** @const */
const MAX_LIFE = 100;

/** @const */
const SOLDIER_WIDTH = 32;
/** @const */
const SOLDIER_HEIGHT = 32;

/** @const */
const DESIGN_FIELD_WIDTH = 800;
/** @const */
const DESIGN_FIELD_HEIGHT = 400;

/** @const */
const MAX_COL = DESIGN_FIELD_WIDTH / SOLDIER_WIDTH;
/** @const */
const MAX_ROW = DESIGN_FIELD_HEIGHT / SOLDIER_HEIGHT;

/** const */
var DEFAULT_UNITS = [{ "sizeCol": 4, "sizeRow": 4, "col": 3, "row": 4, type: "warrior", command: "advance" }, 
                       { "sizeCol": 4, "sizeRow": 4, "col": 8, "row": 4, type: "warrior", command: "advance" }, 
                       { "sizeCol": 4, "sizeRow": 4, "col": 13, "row": 4,type: "warrior", command: "advance" }, 
                       { "sizeCol": 4, "sizeRow": 4, "col": 18, "row": 4, type: "warrior", command: "advance" }, 
                       { "sizeCol": 16, "sizeRow": 1, "col": 5, "row": 10, type: "archer", command: "advance" }, 
                       { "sizeCol": 16, "sizeRow": 1, "col": 5, "row": 12, type: "archer", command: "advance" }];