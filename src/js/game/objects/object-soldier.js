const MELEE_ATTACK_RANGE = 10;
const MELEE_SEEK_RANGE = 200;

const RANGED_ATTACK_RANGE = 300;
const RANGED_SEEK_RANGE = 500;

const MIN_RANGE_ATTACK = 20;
const RANGED_ATTACK_COOLDOWN = 25;

const SEEK_COOLDOWN = 5;


/**
 * @constructor
 */
function SoldierObject(x, y, direction, plan, world, color, type) {
    direction += (Math.random() - Math.random()) / 1000;
    GameObject.call(this, x, y, SOLDIER_WIDTH, SOLDIER_HEIGHT, direction);
    
    this.plan = plan;
    this.world = world;
    this.type = type;
    
    this.velocity = 0;
    this.targetVelocity = 1;
    
    this.force = [0, 0];
    
    this.targetDirection = direction;
    
    this.image = $("#asset-soldier-" + this.type);
    this.imageDead = $("#asset-soldier-" + this.type + "-dead");
    this.color = color;

    this.life = MAX_LIFE;
    this.newLife = MAX_LIFE;
    
    if (this.type === "warrior") {
        this.seekRange = MELEE_SEEK_RANGE;
        this.attackRange = MELEE_ATTACK_RANGE;

        this.rangeDefence = 5;

        this.meleeDefence = 50;
        this.meleeAttack = 100;
    } else if (this.type === "archer") {
        this.seekRange = RANGED_SEEK_RANGE;
        this.attackRange = RANGED_ATTACK_RANGE;

        this.rangeAttack = 90;
        this.rangeDefence = 2;

        this.meleeDefence = 4;
        this.meleeAttack = 1;
    }

    this.cooldowns = {};
}

SoldierObject.prototype = Object.create(GameObject.prototype);

/**
 * @param {Canvas} canvas
 */
SoldierObject.prototype.render = function(canvas) {
    canvas.save()       
        .translate(-this.getWidth()/2, -this.getHeight()/2)
        .drawImage(this.life > 0 ? this.image : this.imageDead, 0, 0);

    if (this.life > 0) {
        if (this.life < MAX_LIFE) {
            canvas.drawText(10, 0, this.life << 0)
        }
        canvas.fillStyle(this.color)
            .fillRect(0, 10, 10, 5 * this.life / MAX_LIFE)
    }

    canvas.restore();
};

SoldierObject.prototype.cooldown = function(name, maxValue) {
    if (!this.cooldowns[name]) {
        this.cooldowns[name] = maxValue;
        return true;
    }
};

SoldierObject.prototype.updateCooldowns = function(deltaTime) {
    for (var cooldown in this.cooldowns) {
        if ((this.cooldowns[cooldown] -= deltaTime) <= 0) {
            delete this.cooldowns[cooldown];
        }
    }
};

// controls
SoldierObject.prototype.setTargetDirection = function(targetDirection) {
    this.targetDirection = targetDirection;
};

SoldierObject.prototype.setTargetVelocity = function(targetVelocity) {
    this.targetVelocity = targetVelocity;
};

// update
SoldierObject.prototype.updateVelocity = function(deltaTime) {
    this.velocity = this.getTargetVelocity() * deltaTime + this.velocity * (1 - deltaTime);
};

SoldierObject.prototype.getTargetVelocity = function() {
    return this.targetVelocity;
};

SoldierObject.prototype.getVelocity = function() {
    return this.velocity;
};

SoldierObject.prototype.update = function(deltaTime) {
    this.updateCooldowns(deltaTime);

    if (this.life > 0) {
        this.updatePlan(deltaTime);
    }

    this.updateVelocity(deltaTime);
    
    this.setX(this.vec[0] + this.force[0] * deltaTime);
    this.setY(this.vec[1] + this.force[1] * deltaTime);
    
    // rotate object
    var cx = Math.cos(this.getDirection()) * (1 - deltaTime),
        cy = Math.sin(this.getDirection()) * (1 - deltaTime);
    var dx = Math.cos(this.targetDirection) * deltaTime,
        dy = Math.sin(this.targetDirection) * deltaTime;
    this.setDirection(Math.atan2(cy + dy, cx + dx));

    // move force
    if (this.life > 0) {
        this.addForce(VMath.scale([Math.cos(this.direction), Math.sin(this.direction)], this.velocity * (1 - Math.random()) * deltaTime/2));
    }
    
    // degrade force
    this.force = VMath.sub(this.force, VMath.scale(this.force, deltaTime*0.1));
    if (VMath.length(this.force) < VMath.EPSILON) {
        this.force = [0, 0];
    }

    this.life = this.newLife;
};

SoldierObject.prototype.distance = function(soldier) {
    return VMath.distance(this.vec, soldier.vec);
};

SoldierObject.prototype.queryEnemy = function(distance) {
    var enemies = this.world.queryObjects(SoldierObject, 
        soldier => soldier.isEnemy(this) 
            && soldier.life > 0 
            && VMath.withinDistance(soldier.vec, this.vec, distance));
    if (enemies.length > 0) {
        return enemies.reduce((r, soldier) => soldier.distance(this) < r.distance(this) ? soldier : r, enemies[0]);
    }
}

SoldierObject.prototype.seekEnemy = function(distance) {
    // are there any enemies?
    if (this.enemy && (this.enemy.life <= 0 || this.enemy.distance(this) > distance)) {
        this.enemy = null;
    }

    if (!this.enemy && this.cooldown("seek-" + distance, SEEK_COOLDOWN)) {
        this.enemy = this.queryEnemy(distance);
    }

    if (this.enemy) {
        var target = this.enemy.vec;
        var dist = VMath.distance(this.vec, target);
        var direction = VMath.atan2(this.vec, target);
        this.setTargetDirection(direction);

        var velocityBonus = 0;
        if (this.type === 'warrior' && dist > 50 && dist < MELEE_SEEK_RANGE && !this.cooldown("charge", 0.5)) {
            velocityBonus += 1;
        }
        this.setTargetVelocity(dist > this.attackRange ? 1 + velocityBonus : 0);    
        
        if (this.rangeAttack && dist < this.attackRange && dist > MIN_RANGE_ATTACK && this.cooldown("arrow", RANGED_ATTACK_COOLDOWN)) {
            this.world.addObject(new ArrowObject(this.vec, this.enemy.vec, this.world, this.rangeAttack));
        }

        return true;
    }
}

SoldierObject.prototype.updatePlan = function(deltaTime) {
    if (!this.seekEnemy(this.seekRange)) {
        // stick to the plan
        this.plan.getCommand(this.world.getTime()).execute(this);
    }    
};

SoldierObject.prototype.addForce = function(vec) {
    this.force = VMath.add(this.force, vec);
};

SoldierObject.prototype.getDefence = function(soldier, factor) {
    var baseDefence = Math.abs(VMath.angle(VMath.sub(soldier.vec, this.vec), [Math.cos(this.direction), Math.sin(this.direction)])) / Math.PI;
    return Math.min(baseDefence / factor, 0.3);
};

SoldierObject.prototype.getAttack = function(soldier) {
    return (1 - this.getDefence(soldier, this.meleeDefence)) * this.meleeAttack;
};

SoldierObject.prototype.hit = function(bySoldier) {
    this.hitBy(this.getDefence(bySoldier, this.meleeDefence) * bySoldier.getAttack(this));
};

SoldierObject.prototype.hitByArrow = function(arrow) {
    this.hitBy(arrow.getAttack(arrow) * this.getDefence(arrow, this.rangeDefence));
};

SoldierObject.prototype.hitBy = function(value) {
    this.newLife = Math.max(this.newLife - value, 0);
};

SoldierObject.prototype.isEnemy = function(ofSoldier) {
    return this.plan.masterPlan !== ofSoldier.plan.masterPlan;
};

SoldierObject.prototype.isClass = function(Class) {
    return Class === SoldierObject || Class === GameObject;
};