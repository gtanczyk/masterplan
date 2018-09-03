class DesignerUnit {
    constructor(field, col, row, sizeCol, sizeRow, formation) {
        this.field = field;
        this.sizeCol = sizeCol;
        this.sizeRow = sizeRow;

        this.el = document.createElement('div');
        this.el.className = "field-unit"; 
        this.el.designerUnit = this;
        this.el.style.width = this.sizeCol * SOLDIER_WIDTH + "px";
        this.el.style.height = this.sizeRow * SOLDIER_HEIGHT + "px";
        this.field.appendChild(this.el);

        this.setFormation(formation);
        this.setPosition(col, row);
    }

    getDefinition() {
        return {
            sizeCol: this.sizeCol,
            sizeRow: this.sizeRow,
            col: this.col,
            row: this.row,
            formation: this.formation
        }
    }

    setFormation(formation) {
        this.formation = formation;
        this.el.dataset.formation = formation;
    }

    getFormation() {
        return this.formation;
    }

    updatePosition() {
        this.el.style.left = this.col * SOLDIER_WIDTH + "px";
        this.el.style.top = this.row * SOLDIER_HEIGHT + "px";
    }

    setPosition(col, row) {
        this.col = Math.max(0, Math.min(col, MAX_COL - this.sizeCol));
        this.row = Math.max(0, Math.min(row, MAX_ROW - this.sizeRow));

        this.updatePosition();
    }

    startDrag() {
        this.field.classList.add("drag");
        this.el.classList.add("drag");
    }

    stopDrag() {
        this.field.classList.remove("drag");
        this.el.classList.remove("drag");
    }

    select() {
        this.el.classList.add("select");
    }

    deselect() {
        this.el.classList.remove("select");
    }
};

DesignerUnit.of = (field, def) => new DesignerUnit(field, def.col, def.row, def.sizeCol, def.sizeRow, def.formation);