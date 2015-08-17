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
    this.raceStandings = $('#race-standings');
    
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
    this.renderStandings();

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
    this.raceTime.innerHTML = formatRaceTime(this.race.getTime());
};

GameHUD.prototype.renderStandings = function() {
    this.raceStandings.innerHTML = this.race.getStandings().map(function(standing, idx) {
        return '<div class="pos-'+idx+'">'+(idx+1)+'. '+formatRaceTime(standing.getTime())+'</div>'
    }).join(' ');
};

GameHUD.prototype.showPause = function() {
    
};