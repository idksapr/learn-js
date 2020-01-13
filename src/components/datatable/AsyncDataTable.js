import DataTable from "./DataTable";
import fetchJson from "../../utils/fetchJson";

/**
 * class AsyncDataTable
 */
class AsyncDataTable extends DataTable {
    constructor() {
        super();
        this.setPageSize(10);
    }

    setUrl(url) {
        this.url = new URL(url);
        return this;
    }

    setPageSize(size) {
        this.pageSize = size;
        return this;
    }

    sort(key) {
        let desc = this.lastSortKey === key ? !this.lastSortIsDesc : false;
        this.url.searchParams.set('_sort', key);
        this.url.searchParams.set('_order', desc ? 'desc' : 'asc');

        this.lastSortKey = key;
        this.lastSortIsDesc = desc;

        return this.clear().load();
    }

    load() {
        if (this.url) {
            this.url.searchParams.set('_start', this.rows.length);
            this.url.searchParams.set('_end', this.rows.length + this.pageSize);

            fetchJson(this.url).then(result => {
                if (result) {
                    this.addRows(result);
                    this.emit('data-table:load', result);
                }
            });
        }
        return this;
    }
}

export default AsyncDataTable;