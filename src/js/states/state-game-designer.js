function stateGameDesigner(definitions, enemyDefinitions) {
    var stored;
    try {
        stored = localStorage["battle-string"];        
    } catch(e) {

    }
    if (!definitions && stored) {
        definitions = decodeBattleString(stored);
        $('#username').value = definitions.username;
    } else if (!definitions) {
        definitions = decodeBattleString(DEFAULT_UNITS);
        $('#username').value = definitions.username = 'Bonaparte' + (1000 * Math.random() << 0);
    }

    var designer = document.getElementById("game-designer");
    designer.classList.add("visible");

    var field = document.getElementById("designer-field");
    field.style.width = DESIGN_FIELD_WIDTH + 'px';
    field.style.height = DESIGN_FIELD_HEIGHT + 'px';
    field.innerHTML = '';

    var units = definitions.map(def => DesignerUnit.of(field, def));

    var mouseDownUnit;
    var clickUnit;

    function getDefs() {
        var defs = units.map(unit => unit.getDefinition());
        defs.username = localStorage["username"];
        return defs;
    }

    saveBattleString(definitions);
    saveBattleString(enemyDefinitions || decodeBattleString(DEFAULT_UNITS), 'test-battle-string');

    if (enemyDefinitions && enemyDefinitions.username) {
        $('#battle-versus').innerHTML = `Opened a link from <a href="https://twitter.com/${enemyDefinitions.username + '">' + enemyDefinitions.username}</a>, and you will battle their masterplan! <button id="vs-reset">Click to reset</button><br/><br/>
        <button id="button-test-battle">Play the battle</button>`;
    }

    return function stateGameDesignerHandler(eventType, eventObject) {
        if (eventType === EVENT_MOUSE_DOWN && eventObject.target.classList.contains("field-unit")) {
            mouseDownUnit = eventObject.target.designerUnit;
        }

        if (eventType === EVENT_MOUSE_UP && mouseDownUnit) {
            mouseDownUnit.stopDrag();
            mouseDownUnit = null;
        }

        if (eventType === EVENT_MOUSE_MOVE && mouseDownUnit && eventObject.target.designerUnit === mouseDownUnit) {
            mouseDownUnit.startDrag();
        }

        if (eventType === EVENT_MOUSE_MOVE && mouseDownUnit && eventObject.target === field) {
            mouseDownUnit.setPosition(eventObject.offsetX / SOLDIER_WIDTH << 0, eventObject.offsetY / SOLDIER_HEIGHT << 0);
            saveBattleString(getDefs());
        }

        if (eventType === EVENT_MOUSE_DOWN && eventObject.target.id === "button-test-battle") {
            designer.classList.remove("visible");
            return stateGameBattleInit(getDefs(), loadBattleString('test-battle-string'));
        }

        if (eventType === EVENT_MOUSE_UP && clickUnit && field.contains(eventObject.target)) {
            clickUnit.deselect();
            clickUnit = null;
        }

        if (eventType === EVENT_MOUSE_UP && eventObject.target.classList.contains("field-unit")) {
            clickUnit = eventObject.target.designerUnit;
            clickUnit.select();
        }

        if (eventType === EVENT_MOUSE_CLICK && eventObject.target.classList.contains("formation-button") && clickUnit) {
            var size = eventObject.target.dataset["formation"].split("x");
            clickUnit.setFormation(size[0], size[1]);
            saveBattleString(getDefs());
        }

        if (eventType === EVENT_MOUSE_CLICK && eventObject.target.dataset["unitType"] && clickUnit) {
            clickUnit.setType(eventObject.target.dataset["unitType"]);
            saveBattleString(getDefs());
        }

        if (eventType === EVENT_MOUSE_CLICK && eventObject.target.dataset["command"] && clickUnit) {
            clickUnit.setCommand(eventObject.target.dataset["command"]);
            saveBattleString(getDefs());
        }

        if (eventType === EVENT_MOUSE_CLICK && eventObject.target.id === "tweet") {
            window.open("https://twitter.com/home?status="+encodeURIComponent(`#masterplan_js13k ${$('#sharelink').value}`));
        }

        if (eventType === EVENT_MOUSE_CLICK && eventObject.target.id === "email") {
            location.href= `mailto:${document.querySelector('[type=email').value}?subject=${'Check my MasterPlan'}&body=${$('#sharelink').value}`;
        }

        if (eventType === EVENT_MOUSE_CLICK && eventObject.target.id === "battle-string-load") {
            return new stateGameDesigner(loadBattleString());
        }

        if (eventType === EVENT_MOUSE_CLICK && eventObject.target.id === "vs-reset") {
            location.hash = '';
            location.reload();
        }

        if (eventType === EVENT_KEY_UP && eventObject.target.id === "username") {
            localStorage["username"] = eventObject.target.value;
            saveBattleString(getDefs());
        }
    };
}