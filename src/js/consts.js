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
var LAYER_WATER = 'layer-water';

/** @const */
var TYPE_ARCHER = 16;
var TYPE_WARRIOR = 17;
var TYPE_TANK = 18;

const EDGE_RADIUS = 800;

const MAX_LIFE = 100;

const SOLDIER_WIDTH = 32;
const SOLDIER_HEIGHT = 32;

const DESIGN_FIELD_WIDTH = 800;
const DESIGN_FIELD_HEIGHT = 400;

const MAX_COL = DESIGN_FIELD_WIDTH / SOLDIER_WIDTH;
const MAX_ROW = DESIGN_FIELD_HEIGHT / SOLDIER_HEIGHT;
