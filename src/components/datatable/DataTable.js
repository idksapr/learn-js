import { createField } from './ComparableFields';
import EventEmitter from "../../EventEmitter";

/**
 * class DataTable
 */
export class DataTable extends EventEmitter {
    constructor() {
        super();
        this.fields = {};
        this.rows = [];
        this.lastSortKey = null;
        this.lastSortIsDesc = false;
    }

    addField(key, field) {
        let newField = field;
        newField.title = field.title ? field.title : key;
        this.fields[key] = createField(newField);
        return this;
    }

    addFields(fields) {
        for (let key of Object.keys(fields)) {
            this.addField(key, fields[key]);
        }
        return this;
    }

    addRow(row) {
        this.rows.push(row);
        return this;
    }

    addRows(rows) {
        for (let row of rows) {
            this.addRow(row);
        }
        return this;
    }

    getKeys() {
        return Object.keys(this.fields);
    }

    getRows() {
        return this.rows;
    }

    sort(key) {
        let desc = this.lastSortKey === key ? !this.lastSortIsDesc : false;

        this.rows.sort((a, b) =>
            (desc ? (-1) : 1) * this.fields[key].compare(a[key], b[key])
        );
        this.lastSortKey = key;
        this.lastSortIsDesc = desc;

        return this;
    }

    clear() {
        this.rows = [];
        return this;
    }
}

export default DataTable;