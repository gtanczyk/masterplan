/**
 * @param {Race} race
 * @param {GameWorld} world
 * @param {BoatObject} boat
 * @constructor
 */
function GameHUD(race, world, boat) {
    this.race = race;
    this.world = world;
    this.boat = boat;
    
    this.HUD = $('#game-hud');
    this.raceTime = $('#race-time');
    this.racePosition = $('#race-position');
    
    this.HUD.style.display = "block";
};

GameHUD.prototype.destroy = function() {
    this.HUD.style.display = "none";
}

/**
 * @param {Number} state
 */
GameHUD.prototype.render = function(state) {
    this.renderRaceTime();
    this.renderPosition();

    switch (state) {
        case GAME_STATE_INIT:
            break;
        case GAME_STATE_PLAY:
            break;
        case GAME_STATE_PAUSE:
            break;
        case GAME_STATE_END:
            break;
    }
};

GameHUD.prototype.renderPosition = function() {
    var position = this.race.getPosition(this.boat);
    var total = this.race.getTotal();
    this.racePosition.innerHTML = position + "/" + total;
};

GameHUD.prototype.renderRaceTime = function() {
    var dt = new Date(this.race.getTime());
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();
    var millis =  dt.getMilliseconds();
    this.raceTime.innerHTML = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds + "." + (millis < 10 ? "00" : millis < 100 ? "0" : "") + millis;
};

GameHUD.prototype.showPause = function() {
    
};