/**
 * @constructor
 */
function SoldierObject(x, y, direction, plan, world, color) {
    direction += (Math.random() - Math.random()) / 1000;
    GameObject.call(this, x, y, SOLDIER_WIDTH, SOLDIER_HEIGHT, direction);
    
    this.plan = plan;
    this.world = world;
    
    this.velocity = 0;
    this.targetVelocity = 1;
    
    this.force = [0, 0];
    
    this.targetDirection = direction;
    
    this.image = $("#asset-soldier");
    this.imageDead = $("#asset-soldier-dead");
    this.color = color;

    this.life = MAX_LIFE;
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
        canvas.drawText(10, 0, this.life << 0)
        canvas.fillStyle(this.color)
            .fillRect(-10, 0, 10, 5 * this.life / 100)
    }

    canvas.restore();
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
    if (this.life > 0) {
        this.updatePlan();
    }

    this.updateVelocity(deltaTime);
    
    this.setX(this.x + this.force[0] * deltaTime);
    this.setY(this.y + this.force[1] * deltaTime);
    
    // rotate object
    var cx = Math.cos(this.getDirection()) * (1 - deltaTime),
        cy = Math.sin(this.getDirection()) * (1 - deltaTime);
    var dx = Math.cos(this.targetDirection) * deltaTime,
        dy = Math.sin(this.targetDirection) * deltaTime;
    this.setDirection(Math.atan2(cy + dy, cx + dx));

    // move force
    if (this.life > 0) {
        this.addForce(VMath.scale([Math.cos(this.direction), Math.sin(this.direction)], this.velocity * deltaTime/2));
    }
    
    // degrade force
    this.force = VMath.sub(this.force, VMath.scale(this.force, deltaTime*0.1));
    if (VMath.length(this.force) < VMath.EPSILON) {
        this.force = [0, 0];
    }
};

SoldierObject.prototype.distance = function(soldier) {
    return VMath.distance(this.vec(), soldier.vec());
};

SoldierObject.prototype.seekEnemy = function(distance) {
    // are there any enemies?
    if (this.enemy && (this.enemy.life <= 0 || this.enemy.distance(this) > distance)) {
        this.enemy = null;
    }

    if (!this.enemy) {
        var enemies = this.world.queryObjects(SoldierObject, 
            soldier => soldier.isEnemy(this) 
                && soldier.life > 0 
                && this.distance(soldier) < distance);
        if (enemies.length > 0) {
            this.enemy = enemies.reduce((r, soldier) => soldier.distance(this) < r.distance(this) ? soldier : r, enemies[0]);
        }
    }

    if (this.enemy) {
        var target = this.enemy.vec();
        var dist = VMath.distance(this.vec(), target);
        var direction = VMath.atan2(this.vec(), target);
        this.setTargetDirection(direction);
        this.setTargetVelocity(dist > 10 ? 1 : 0);    
        return true;
    }
}

SoldierObject.prototype.updatePlan = function() {
    if (!this.seekEnemy(100)) {
        // stick to the plan
        this.plan.getCommand(this.world.getTime()).execute(this);
    }    
};

SoldierObject.prototype.addForce = function(vec) {
    this.force = VMath.add(this.force, vec);
};

SoldierObject.prototype.getDefence = function(soldier) {
    return Math.abs(VMath.angle(VMath.sub(soldier.vec(), this.vec()), [Math.cos(this.direction), Math.sin(this.direction)])) / Math.PI;
};

SoldierObject.prototype.getAttack = function(soldier) {
    return 1 - this.getDefence(soldier);
};

SoldierObject.prototype.hit = function(bySoldier) {
    this.life = Math.max(this.life - 5 * this.getDefence(bySoldier) * bySoldier.getAttack(this), 0);
};

SoldierObject.prototype.isEnemy = function(ofSoldier) {
    return this.plan.masterPlan !== ofSoldier.plan.masterPlan;
};