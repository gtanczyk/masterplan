class SoldierPlan {
    constructor(masterPlan, formation, plan) {
        this.masterPlan = masterPlan;
        this.formation = formation;
        this.plan = plan;
        this.currentCommand = null;
        this.claims = masterPlan.claims;
    }

    getPosition() {
        return this.formation;
    }

    getCommand(worldTime) {
        if ((!this.currentCommand || this.currentCommand.isDone(worldTime)) && this.plan.length > 0)  {
            this.currentCommand = this.plan.splice(0, 1)[0];
            this.currentCommand.start(worldTime);
        }
        
        if (!this.currentCommand) {
            this.currentCommand = new WaitCommand();
        }

        return this.currentCommand;
    }

    canClaim(enemy) {
        if (!this.claims[enemy.soldierId]) {
            this.claims[enemy.soldierId] = 0;
        }

        return this.claims[enemy.soldierId] < 5;
    }

    unclaim(enemy) {
        this.claims[enemy.soldierId]--;
    }
    claim(enemy) {
        if (!this.canClaim(enemy)) {
            return false;
        }

        this.claims[enemy.soldierId]++;

        return true;
    }
}