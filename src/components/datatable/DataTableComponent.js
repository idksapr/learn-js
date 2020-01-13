import Component, { createContainer } from "../Component";

/**
 * class DataTableComponent
 */
class DataTableComponent extends Component {
    constructor(props) {
        super(props);

        this.onSort = this.onSort.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.onLoadTableRows = this.onLoadTableRows.bind(this);
        this.startRowsLoading = this.startRowsLoading.bind(this);

        this.isLoading = false;
        this.isLoaded = false;
    }

    render() {
        return `
            <table>
              ${this.renderHeader()}
              ${this.renderBody()}
            </table>
        `;
    }

    renderHeader() {
        return `
            <thead>
              <tr>
                ${this._props.table.getKeys().reduce((carry, key) =>
                    carry + `<th data-key="${key}">${this._props.table.fields[key].title}</th>`, ''
                )}
              </tr>
            </thead>
        `;
    }

    renderBody() {
        return `<tbody>${this.renderRows(this._props.table.getRows())}</tbody>`;
    }

    renderRows(rows) {
        return rows.reduce((carry, row) => carry + `<tr>${this.renderRow(row)}</tr>`, '');
    }

    renderRow(row) {
        return this._props.table.getKeys().reduce((carry, key) =>
            carry + `<td>${this._props.table.fields[key].render(row[key])}</td>`, ''
        );
    }

    make() {
        super.make();
        this.startRowsLoading();
        return this._container;
    }

    registerEventListeners() {
        window.addEventListener('scroll', this.onScroll);

        this._container.querySelector('thead').addEventListener('click', this.onSort);

        this._props.table.subscribe('data-table:load', this.onLoadTableRows);
    }

    onSort(event) {
        this._container.querySelector('tbody').innerHTML = '';
        this._props.table.sort(event.target.dataset.key);
    }

    onScroll() {
        if (document.documentElement.getBoundingClientRect().bottom < document.documentElement.clientHeight + 100) {
            this.startRowsLoading();
        }
    }

    onLoadTableRows(rows) {
        if (rows.length) {
            this._container
                .querySelector('tbody')
                .insertAdjacentHTML('beforeend', this.renderRows(rows));
            this.endRowsLoading();
        } else {
            this.completeLoading();
        }
    }

    startRowsLoading() {
        if (this.isLoadingPossible()) {
            this.isLoading = true;
            this._props.table.load();
        }
    }

    endRowsLoading() {
        this.isLoading = false;
    }

    completeLoading() {
        this.isLoaded = true;
    }

    isLoadingPossible() {
        return !this.isLoaded && !this.isLoading && this._props.table.load;
    }
}

export default DataTableComponent;