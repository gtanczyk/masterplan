/**
 * @constructor
 */
function GameBonus(name, boat, startTime) {
    this.name = name;
    this.boat = boat;
    this.startTime = startTime;
    this.altered = [];
};

GameBonus.prototype.getName = function() {
    return this.name;
};

GameBonus.prototype.getBoat = function() {
    return this.boat;
};

GameBonus.prototype.isActive = function(worldTime) {
    return this.getTimeLeft(worldTime) > 0;
};

GameBonus.prototype.getDuration = function() {
    return 5000;
};

GameBonus.prototype.getTimeLeft = function(worldTime) {
     return this.startTime + this.getDuration() - worldTime;
};

/**
 * @param {Object} prototype
 * @param {Function} func
 * @param {Function} replacement
 */
GameBonus.prototype.alter = function(prototype, func, replacement) {
    var alter = {
        prototype: prototype,
        original: func,
        revoked: false
    };
    
    // this magic is required, because of minification
    for(var name in prototype) {
        if (prototype[name] === func) {
            alter.name = name;
            prototype[name] = replacement;
            replacement.alter = alter;
            this.altered.push(alter);
            
            break;
        }
    }
    
    return alter.original
};

GameBonus.prototype.deactivate = function() {
    this.altered.forEach(function(alter) {
       alter.prototype[alter.name] = this.getOriginal(alter);
       alter.revoked = true;
    }, this);
};

GameBonus.prototype.getOriginal = function(alter) {
    if (!alter.original.alter) {
        return alter.original;
    } else {
        while (alter.original.alter.revoked) {
            alter = alter.original.alter;
            if (!alter.original.alter) {
                return alter.original;
            }
        }
        return alter.original;
    }
};