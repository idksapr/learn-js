import notifier from "./src/components/notifications/notifier";
import RangePickerComponent from "./src/components/rangepicker/RangePickerComponent";
import RangeSliderComponent from "./src/components/rangeslider/RangeSliderComponent";
import AsyncDataTable from './src/components/datatable/AsyncDataTable';
import DataTableComponent from './src/components/datatable/DataTableComponent';

let container = document.getElementById('container');

if (!container) {
    console.log('Container not found!');
}

const notification = notifier(container);

const rangePicker = new RangePickerComponent({from: '2020-01-25', to:'2020-02-13'});
rangePicker.subscribe(
    'rangepicker:date-interval-change',
    (from, to) => {
        notification(
            `Date interval changed: ${new Date(from).toLocaleDateString()} - ${new Date(to).toLocaleDateString()}`,
            'success'
        );
    }
);
container.append(rangePicker.make());

const rangeSlider = new RangeSliderComponent({ min: 0, max: 100, from: 0, to: 50 });
container.append(rangeSlider.make());

const table = (new AsyncDataTable())
    .addFields({
        id: {
            type: 'text',
        },
        title: {
            type: 'text',
        },
        images: {
            title: 'image',
            type: 'custom',
            extend: 'image',
            prepare: images => images ? images[0].url : null,
        },
        price: {
            type: 'custom',
            extend: 'number',
            render: value => `$${value}`,
        },
        quantity: {
            type: 'number',
        },
        discount: {
            type: 'number',
        },
        subcategory: {
            title: 'category',
            type: 'custom',
            extend: 'text',
            prepare: subcategory => `${subcategory.category.title} / ${subcategory.title}`,
        },
    })
    .setUrl('https://course-js.javascript.ru/api/rest/products?_embed=subcategory.category');

const dataTable = new DataTableComponent({ table });
container.append(dataTable.make());



