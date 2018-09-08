class SoldierPlan {
    constructor(masterPlan, formation, plan) {
        this.masterPlan = masterPlan;
        this.formation = formation;
        this.plan = plan;
        this.currentCommand = null;
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
}