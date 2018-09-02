/**
 * @param {Race} race
 * @param {GameWorld} world
 * @param {BoatObject} boat
 * @constructor
 */
function GameHUD(world) {
    this.world = world;
    
    this.HUD = $('#game-hud');
    this.battleTime = $('#battle-time');
    
    this.HUD.style.display = "block";
};

GameHUD.prototype.destroy = function() {
    this.HUD.display = "none";
};

/**
 * @param {Number} state
 */
GameHUD.prototype.render = function() {
};

GameHUD.prototype.showPause = function() {
    
};