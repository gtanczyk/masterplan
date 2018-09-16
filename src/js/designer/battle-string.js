var TextEncoder = global.TextEncoder || require("util").TextEncoder;
var TextDecoder = global.TextDecoder || require("util").TextDecoder;
var btoa = global.btoa || require("btoa");
var atob = global.atob || require("atob");

var TYPES = {
    // name -> index
    "archer": 1,
    "warrior": 2,
    "tank": 3,
    "artillery": 4,
    // index -> name
    1: "archer",
    2: "warrior",
    3: "tank",
    4: "artillery"
};

var COMMANDS = {
    // name -> index
    "wait-advance": 1,
    "advance": 2,
    "advance-wait": 3,
    "flank-left": 4,
    "flank-right": 5,
    // index -> name
    1: "wait-advance",
    2: "advance",
    3: "advance-wait",
    4: "flank-left",
    5: "flank-right"
};


function saveBattleString(defs, targetId) {
    targetId = targetId || 'battle-string';
    var iter = obj => {
        return [
            obj["sizeCol"], 
            obj["sizeRow"], 
            obj["col"], 
            obj["row"], 
            TYPES[obj["type"]], 
            COMMANDS[obj["command"]]
        ];
    }
    var username = (defs.username || '').split('').map(ch => ch.charCodeAt(0));
    var arr = defs.map(iter).reduce((r, d) => r.concat([d.length], d), []);
    defs = new Uint8Array([arr.length].concat(arr.concat(username)));
    var decoder = new TextDecoder('utf8');
    var encoded = btoa(decoder.decode(defs));
    document.getElementById(targetId).value = encoded;
    try {
        localStorage[targetId] = encoded;
    } catch(e) {

    }
    $('#sharelink').value="http://gtanczyk.warsztat.io/masterplan/index.html#vs="+encoded;
}

function loadBattleString(targetId, value) {
    return decodeBattleString(value || document.getElementById(targetId || 'battle-string').value);
}

function decodeBattleString(battleString) {
    var encoder = new TextEncoder('utf8');
    var defs = encoder.encode((atob(battleString)));
    var result = [];
    var length = defs[0];
    for (var i = 1; i <= length;) {
        var l = defs[i];
        var v = defs.slice(i + 1, i + l + 1);
        result.push({
            "sizeCol": v[0], 
            "sizeRow": v[1], 
            "col": v[2], 
            "row": v[3], 
            "type": TYPES[v[4]], 
            "command": COMMANDS[v[5]]  
        });
        i += l + 1;
    }

    var username = Array["from"](defs.slice(length+1));
    result.username = (username.map(ch => String.fromCharCode(ch)).join('').match(/(\w)+/g) || []).join("");
    
    return result;
};

global.decodeBattleString = decodeBattleString;