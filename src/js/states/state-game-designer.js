function stateGameDesigner(definitions) {
    var designer = document.getElementById("game-designer");
    designer.classList.add("visible");

    var field = document.getElementById("designer-field");
    field.style.width = DESIGN_FIELD_WIDTH + 'px';
    field.style.height = DESIGN_FIELD_HEIGHT + 'px';
    field.innerHTML = '';

    var units = (definitions || DEFAULT_UNITS).map(def => DesignerUnit.of(field, def));

    var mouseDownUnit;
    var clickUnit;

    return function stateGameDesignerHandler(eventType, eventObject) {
        if (eventType === EVENT_MOUSE_DOWN && eventObject.target.className === "field-unit") {
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
        }

        if (eventType === EVENT_MOUSE_DOWN && eventObject.target.id === "button-test-battle") {
            designer.classList.remove("visible");
            return stateGameBattleInit(units.map(unit => unit.getDefinition()));
        }

        if (eventType === EVENT_MOUSE_UP && clickUnit && field.contains(eventObject.target)) {
            clickUnit.deselect();    
            clickUnit = null;
        }

        if (eventType === EVENT_MOUSE_UP && eventObject.target.className === "field-unit") {
            clickUnit = eventObject.target.designerUnit;
            clickUnit.select();
        }

        if (eventType === EVENT_MOUSE_CLICK && eventObject.target.className === "formation-button" && clickUnit) {
            clickUnit.setFormation(eventObject.target.dataset.formation)
        }
    };
}