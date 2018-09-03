class MasterPlan {
    constructor(initialPosition, units) {
        var angle = VMath.atan2(initialPosition, [0, 0]);

        this.formation = [];
        units.forEach(unit => {            
            var soldierCount = unit.sizeCol * unit.sizeRow;
            var offset = [unit.col * SOLDIER_WIDTH, unit.row * SOLDIER_HEIGHT];
            switch (unit.formation) {
                case "column":
                    for(var i = 0; i < soldierCount; i++) {
                        var pos = [i % unit.sizeCol * SOLDIER_WIDTH, (i / unit.sizeCol << 0) * SOLDIER_HEIGHT];
                        this.formation.push(VMath.add(pos, offset));
                    }
                    break;
                case "wedge":
                    var rowSize = 1;
                    var row = 0;
                    while (soldierCount > 0) {
                        for (var i = 0; i < rowSize; i++) {
                            var pos = VMath.rotate([row * SOLDIER_WIDTH, i * SOLDIER_HEIGHT - rowSize/2 * SOLDIER_HEIGHT], Math.PI/2);
                            this.formation.push(VMath.add(pos, offset));
                        }
                        soldierCount -= rowSize;
                        rowSize = Math.min(soldierCount, rowSize + 2);
                        row++;
                    }
                    break;
                default: break;
            }
        });
        var center = [this.formation.reduce((r, pos) => Math.max(pos[0]), 0) / 2, 0];

        this.formation = this.formation.map(pos => VMath.rotate(VMath.sub(pos, center), angle + Math.PI / 2));

        this.plan = [
            new WaitCommand(1000),
            new AdvanceCommand(),
            new AttackCommand()
        ];

        this.currentCommand = null;
    }

    getSoldierCount() {
        return this.formation.length;
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

    getSolderPlan(soldierId) {
        return new SoldierPlan(this, this.formation[soldierId]);
    }
}