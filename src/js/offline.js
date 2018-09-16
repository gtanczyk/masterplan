require("./events");
require("./states/state-game-battle");
require("./designer/battle-string");

global.$ = function() {
    // console.error("jquery call");
};

function run(global) {
    var leftUnits = decodeBattleString(process.argv[2] || DEFAULT_UNITS);
    var rightUnits = decodeBattleString(process.argv[3] || DEFAULT_UNITS);

    var leftName = leftUnits.username || "Red";
    var rightName = rightUnits.username || "Green";

    global.currentState = new stateGameBattleInit(leftUnits, rightUnits, true);
    updateState(EVENT_TIMEOUT);

    for (var i = 0; i <= 60; i++) {
        console.log("Time: ", i * 1000);
        updateState(EVENT_RAF, 1000);
        updateState(EVENT_INTERVAL_SECOND);
    }

    var balance = global.currentState.resultBalance;
    console.log("Balance", typeof balance, balance, balance < 1/3, balance > 2/3);
    console.log("Result", (balance < 1/3 ? rightName : balance > 2/3 ? leftName : "Draw"), balance ? ((balance * 100 << 0) + "%") : "");
}

if (typeof process !== "undefined") {
    run(global);
}

