require("./../states");
require("./../game/game-world");
require("./../game/game-hud");
require("./../game/masterplan/masterplan");
require("./../game/masterplan/soldierplan");

function stateGameBattleInit(definitions, definitionsEnemy, headless) {
    var world = new GameWorld();

    var createMasterPlan = (direction, color, definitions) => {
        var angle = direction * Math.PI - Math.PI / 2;
        var initialPosition = [Math.cos(angle) * 300, Math.sin(angle) * 300];
        var masterPlan = new MasterPlan(initialPosition, definitions);

        for (var i = 0; i < masterPlan.getSoldierCount(); i++) {
            var soldierPlan = masterPlan.getSolderPlan(i);
            var pos = VMath.add(soldierPlan.getPosition(), initialPosition);            
            world.addObject(new SoldierObject(pos[0], pos[1], angle + Math.PI, soldierPlan, world, color, masterPlan.getType(i)));
        }

        return masterPlan;
    }

    var masterPlanLeft = createMasterPlan(1, '#ff0000', definitions);    
    var masterPlanRight = createMasterPlan(0, '#00ff00', definitionsEnemy);
    
    if (!headless) {
        var HUD = new GameHUD(world);
        HUD.setNames(definitions.username, definitionsEnemy.username || 'Computer')
    }

    return function GameBattleInitHandler(eventType, eventObject) {
        if (!headless) {
            renderGame(world, HUD);
            HUD.render(world);
        }
        
        if (eventType == EVENT_TIMEOUT) {
            return new stateGameBattle(world, HUD, definitions, definitionsEnemy, headless);
        }
    }.WeakState(1000);
};    

function stateGameBattle(world, HUD, definitions, definitionsEnemy, headless) {
    var damageTotal = 0;
    var damage = {
        [EVENT_DAMAGE]: {
            '#ff0000': 0,
            '#00ff00': 0
        }, 
        [EVENT_DAMAGE_ARROW]: {
            '#ff0000': 0,
            '#00ff00': 0
        }
    };
    var damageCount = JSON.parse(JSON.stringify(damage));

    return function GameBattleHandler(eventType, eventObject) {
        if (eventType == EVENT_RAF) {
            var elapsedTime = Math.min(eventObject, 1000);
            while (elapsedTime > 0) {
                elapsedTime = world.update(elapsedTime);
            }            

            if (!headless) {
                renderGame(world);            
            }
        }
        
        if (eventType === EVENT_INTERVAL_100MS && !headless) {
            HUD.render(world);
        }

        if (eventType === EVENT_INTERVAL_SECOND) {
            // console.log("Damage total: " + damageTotal);
            // console.log("Damage: " + JSON.stringify(damage));
            // console.log("Damage count: " + JSON.stringify(damageCount));

            var balance = world.getBalance();
            console.log("current balance", balance);
            if (world.getTime() > 60000 || (balance === 0 || balance === 1)) {
                return new stateGameBattleEnd(world, HUD, definitions, definitionsEnemy, headless);
            }
        }

        if (eventType === EVENT_ARROW && global.aa) {
            global.aa.play("arrow");
        }
        if (eventType === EVENT_DAMAGE && global.aa) {
            global.aa.play("damage");
        }
        if (eventType === EVENT_DAMAGE_ARROW && global.aa) {
            global.aa.play("hitarrow");
        }
        if (eventType === EVENT_DAMAGE || eventType === EVENT_DAMAGE_ARROW) {
            damageTotal += eventObject.damage;            
            damage[eventType][eventObject.soldier.color] += eventObject.damage;            
            damageCount[eventType][eventObject.soldier.color]++;            
        }
    };
}

function stateGameBattleEnd(world, HUD, definitions, definitionsEnemy, headless) {
    var result = !headless && HUD.renderResults(world);
    var handler = function GameBattleEndHandler(eventType, eventObject) {
        !headless && renderGame(world);

        if (eventType === EVENT_MOUSE_CLICK) {
            freeCanvas(LAYER_DEFAULT);
            HUD.destroy();
            if (result === '#ff0000' && !definitionsEnemy.username) {
		var newEnemy = JSON.parse(JSON.stringify(definitions));
		delete newEnemy.username;
                return new stateGameDesigner(definitions, newEnemy);
            } else {
                return new stateGameDesigner(definitions, definitionsEnemy);
            }
        }
    };

    handler.resultBalance = world.getBalance();

    return handler;
}

global.stateGameBattleInit = stateGameBattleInit;