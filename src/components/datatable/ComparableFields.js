/**
 * class DefaultField
 */
class DefaultField {
    constructor(field) {
        this.title = field.title;
    }

    compare(a, b) {
        return a === b ? 0 : (a > b ? 1 : -1);
    }

    render(value) {
        return value;
    }
}

/**
 * class TextField
 */
class TextField extends DefaultField {}

/**
 * class BooleanField
 */
class BooleanField extends DefaultField  {
    render(value) {
        return value ? 'yes' : 'no';
    }
}

/**
 * class NumberField
 */
class NumberField extends DefaultField {
    compare(a, b) {
        return super.compare(+a, +b);
    }
}

/**
 * class ImageField
 */
class ImageField extends DefaultField {
    compare(a, b) {
        return 0;
    }

    render(src) {
        return `<img src=${src} />`;
    }
}

/**
 * class LinkField
 */
class LinkField extends DefaultField {
    compare(link1, link2) {
        let a = '';
        let b = '';

        if (link1.text && link2.text) {
            a = link1.text;
            b = link2.text;
        } else if (link1.src && link2.src) {
            a = link1.src;
            b = link2.src;
        }
        return super.compare(a, b);
    }

    render(link) {
        return `<a href=${link.src} target='_blank'>${link.text ? link.text : link.src}</a>`;
    }
}

/**
 * class CustomField
 */
class CustomField extends DefaultField {
    constructor(field) {
        super(field);
        this.field = field;
        this.extendableField = createField(Object.assign(field, {type: field.extend}));
    }

    prepare(value) {
        return this.field.prepare ? this.field.prepare(value) : value;
    }

    compare(a, b) {
        let A = this.prepare(a);
        let B = this.prepare(b);

        return this.field.compare ?
            this.field.compare(A, B) :
            this.extendableField.compare(A, B);
    }

    render(value) {
        let preparedValue = this.prepare(value);

        return this.field.render ?
            this.field.render(preparedValue) :
            this.extendableField.render(preparedValue);
    }
}

/**
 * function createField
 */
export const createField = field => {
    switch (field.type) {
        case 'text': return new TextField(field);
        case 'number': return new NumberField(field);
        case 'image': return new ImageField(field);
        case 'link': return new LinkField(field);
        case 'boolean': return new BooleanField(field);
        case 'custom': return new CustomField(field);
        default: return new DefaultField(field);
    }
}

export default { createField };