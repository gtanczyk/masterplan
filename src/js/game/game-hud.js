/**
 * @param {GameWorld} world
 * @constructor
 */
function GameHUD(world) {
    this.world = world;
    
    this.HUD = $('#game-hud');
    this.battleTime = $('#battle-time');
    this.battleResult = $('#battle-result');
    
    this.HUD.style.display = "block";
};

GameHUD.prototype.destroy = function() {
    this.HUD.display = "none";
    this.battleResult.innerHTML = '';
};

GameHUD.prototype.render = function() {
};


GameHUD.prototype.renderResults = function(alive) {
    var aliveKeys = Object.keys(alive);
    if (aliveKeys.length % 2 == 0) {
        this.battleResult.innerHTML = 'DRAW';
    }

    if (aliveKeys.length == 1) {
        this.battleResult.innerHTML = `<div style="color: ${aliveKeys[0]}">
            <span style="background: ${aliveKeys[0]}"> </span> VICTORY!
            <inline style="color: black">Click to get back to designer</inline>
        </div>`;
    }
};

GameHUD.prototype.showPause = function() {
    
};