function stateGameBattleInit(definitions) {
    var world = new GameWorld();

    var createMasterPlan = (direction, color, definitions) => {
        var angle = direction * Math.PI;
        var initialPosition = [Math.cos(angle) * 300, 0];
        var masterPlan = new MasterPlan(initialPosition, definitions);

        for (var i = 0; i < masterPlan.getSoldierCount(); i++) {
            var soldierPlan = masterPlan.getSolderPlan(i);
            var pos = VMath.add(soldierPlan.getPosition(), initialPosition);            
            world.addObject(new SoldierObject(pos[0], pos[1], angle + Math.PI, soldierPlan, world, color, masterPlan.getType(i)));
        }

        return masterPlan;
    }

    var masterPlanLeft = createMasterPlan(1, '#ff0000', definitions);    
    var masterPlanRight = createMasterPlan(0, '#00ff00', DEFAULT_UNITS);
    
    var HUD = new GameHUD(world);

    return function GameBattleInitHandler(eventType, eventObject) {
        renderGame(world, HUD);
        HUD.render();
        
        if (eventType == EVENT_TIMEOUT) {
            return new stateGameBattle(world, HUD, definitions);
        }
    }.WeakState(1000);
};    

function stateGameBattle(world, HUD, definitions) {
    return function GameBattleHandler(eventType, eventObject) {
        if (eventType == EVENT_RAF) {
            var elapsedTime = Math.min(eventObject, 1000);
            while (elapsedTime > 0) {
                elapsedTime = world.update(elapsedTime);
            }            

            renderGame(world);
            HUD.render();
        
            if (world.getTime() > 60000 || Object.keys(world.getAlive()).length <= 1) {
                return new stateGameBattleEnd(world, HUD, definitions);
            }
        }        
    };
}

function stateGameBattleEnd(world, HUD, definitions) {
    var result = HUD.renderResults(world.getAlive());
    return function GameBattleEndHandler(eventType, eventObject) {
        renderGame(world);

        if (eventType === EVENT_MOUSE_CLICK) {
            freeCanvas(LAYER_DEFAULT);
            HUD.destroy();
            if (result === '#ff0000') {
                DEFAULT_UNITS = definitions;
            }
            return new stateGameDesigner(definitions);
        }
    };
}