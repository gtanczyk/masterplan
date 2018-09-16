if (typeof window !== "undefined") {
    window["require"] = function (moduleName) {
        console.log("Require", moduleName);
    };

    /** @global */
    global = window || global;
}


/** @const.*/
var NULL = global.NULL = null;
/** @const.*/
var TRUE = global.TRUE = true;
/** @const.*/
var FALSE = global.FALSE = false;

/** global.*/
var MIN_TICK = global.MIN_TICK = 10;
var UPDATE_TICK = global.UPDATE_TICK = 100;

/** @const.*/
var GAME_STATE_INIT = global.GAME_STATE_INIT = 0;
/** @const.*/
var GAME_STATE_BATTLE_INIT = global.GAME_STATE_BATTLE_INIT = 1;
/** @const.*/
var GAME_STATE_PAUSE = global.GAME_STATE_PAUSE = 2;
/** @const.*/
var GAME_STATE_END = global.GAME_STATE_END = 3;

/** @const.*/
var LAYER_DEFAULT = global.LAYER_DEFAULT = 'layer-default';

/** @const.*/
var TYPE_ARCHER = global.TYPE_ARCHER = 16;

/** @const.*/
var TYPE_WARRIOR = global.TYPE_WARRIOR = 17;

/** @const.*/
var TYPE_TANK = global.TYPE_TANK = 18;

/** @const.*/
var EDGE_RADIUS = global.EDGE_RADIUS = 800;

/** @const.*/
var MAX_LIFE = global.MAX_LIFE = 100;

/** @const.*/
var SOLDIER_WIDTH = global.SOLDIER_WIDTH = 32;
/** @const.*/
var SOLDIER_HEIGHT = global.SOLDIER_HEIGHT = 32;

/** @const.*/
var DESIGN_FIELD_WIDTH = global.DESIGN_FIELD_WIDTH = 1600;
/** @const.*/
var DESIGN_FIELD_HEIGHT = global.DESIGN_FIELD_HEIGHT = 800;

/** @const.*/
var MAX_COL = global.MAX_COL = global.DESIGN_FIELD_WIDTH / global.SOLDIER_WIDTH;
/** @const.*/
var MAX_ROW = global.MAX_ROW = global.DESIGN_FIELD_HEIGHT / global.SOLDIER_HEIGHT;

/** global.*/
var DEFAULT_UNITS = global.DEFAULT_UNITS = "RgYEBAMEAgIGBAQIBAICBgQEDQQCAgYEBBIEAwIGBAQXBAMCBgQEHAQCAgYEBCEEAgIGBAQmBAICBhABEgoBAgYQARcMAQI=";

var SWORD_RANGE = global.SWORD_RANGE = 10;
var MELEE_ATTACK_RANGE = global.MELEE_ATTACK_RANGE = global.SOLDIER_WIDTH + global.SWORD_RANGE;
var MELEE_SEEK_RANGE = global.MELEE_SEEK_RANGE = 600;
var MELEE_ATTACK_COOLDOWN = global.MELEE_ATTACK_COOLDOWN = 250;

var RANGED_ATTACK_RANGE = global.RANGED_ATTACK_RANGE = 300;
var RANGED_SEEK_RANGE = global.RANGED_SEEK_RANGE = 500;

var MIN_RANGE_ATTACK = global.MIN_RANGE_ATTACK = global.SOLDIER_WIDTH * 5;
var RANGED_ATTACK_COOLDOWN = global.RANGED_ATTACK_COOLDOWN = 1000;
var ARROW_RANGE = global.ARROW_RANGE = global.SOLDIER_WIDTH / 3;
var BALL_RANGE = global.BALL_RANGE = global.SOLDIER_WIDTH * 4;

var DEFENCE_COOLDOWN = global.DEFENCE_COOLDOWN = 1500;

var SEEK_COOLDOWN = global.SEEK_COOLDOWN = 1000;