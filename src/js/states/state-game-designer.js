function stateGameDesigner(definitions) {
    definitions = definitions || DEFAULT_UNITS;

    var designer = document.getElementById("game-designer");
    designer.classList.add("visible");

    var field = document.getElementById("designer-field");
    field.style.width = DESIGN_FIELD_WIDTH + 'px';
    field.style.height = DESIGN_FIELD_HEIGHT + 'px';
    field.innerHTML = '';

    var units = definitions.map(def => DesignerUnit.of(field, def));

    var mouseDownUnit;
    var clickUnit;

    function saveBattleString(defs, targetId) {
        var iter = obj => {
            return [obj.sizeCol, obj.sizeRow, obj.col, obj.row, DesignerUnit.types[obj.type], DesignerUnit.commands[obj.command]];
        }
        defs = new Uint8Array(defs.map(iter).reduce((r, d) => r.concat([d.length], d), []));
        var decoder = new TextDecoder('utf8');
        document.getElementById(targetId || 'battle-string').value = btoa(decoder.decode(defs));
    }

    function loadBattleString(targetId) {
        var encoder = new TextEncoder('utf8');
        var defs = encoder.encode((atob(document.getElementById(targetId || 'battle-string').value)));
        var result = [];
        for (var i = 0; i < defs.length;) {
            var l = defs[i];
            var v = defs.slice(i + 1, i + l + 1);
            result.push({
                sizeCol: v[0], 
                sizeRow: v[1], 
                col: v[2], 
                row: v[3], 
                type: DesignerUnit.types[v[4]], 
                command: DesignerUnit.commands[v[5]]  
            });
            i += l + 1;
        }
        
        return result;
    }

    function getDefs() {
        return units.map(unit => unit.getDefinition());
    }

    saveBattleString(definitions);
    saveBattleString(DEFAULT_UNITS, 'test-battle-string');

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
            var size = eventObject.target.dataset.formation.split("x");
            clickUnit.setFormation(size[0], size[1]);
            saveBattleString(getDefs());
        }

        if (eventType === EVENT_MOUSE_CLICK && eventObject.target.dataset.unitType && clickUnit) {
            clickUnit.setType(eventObject.target.dataset.unitType);
            saveBattleString(getDefs());
        }

        if (eventType === EVENT_MOUSE_CLICK && eventObject.target.dataset.command && clickUnit) {
            clickUnit.setCommand(eventObject.target.dataset.command);
            saveBattleString(getDefs());
        }

        if (eventType === EVENT_MOUSE_CLICK && eventObject.target.id === "tweet") {
            window.open("https://twitter.com/home?status="+encodeURIComponent(`#masterplan_js13k ${document.getElementById('battle-string').value}`));
        }

        if (eventType === EVENT_MOUSE_CLICK && eventObject.target.id === "email") {
            location.href= `mailto:${document.querySelector('[type=email').value}?subject=${'Check my MasterPlan'}&body=${document.getElementById('battle-string').value}`;
        }

        if (eventType === EVENT_MOUSE_CLICK && eventObject.target.id === "battle-string-load") {
            return new stateGameDesigner(loadBattleString());
        }
    };
}