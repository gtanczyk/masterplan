class SoldierPlan {
    constructor(masterPlan, formation) {
        this.masterPlan = masterPlan;
        this.formation = formation;
    }

    getPosition() {
        return this.formation;
    }

    getCommand(worldTime) {
        return this.masterPlan.getCommand(worldTime);
    }
}