/**
 * Get HTML by template
 * @param template
 * @param placeholders
 * @returns {string}
 */
export const getHtmlByTemplate = (template, placeholders) => {
    return replacePlaceholders(prepareTemplate(template), placeholders);
};

/**
 * Replaces scalar placeholders in the template
 * @param template
 * @param placeholders
 * @returns {string}
 */
const replacePlaceholders = (template, placeholders) =>
    Object.keys(placeholders).reduce((carry, key) =>
        replaceScalarPlaceholders(
            replaceVectorPlaceholders(
                replaceIterations(
                    carry,
                    key,
                    placeholders
                ),
                key,
                placeholders
            ),
            key,
            placeholders
        ), template);

/**
 *
 * @param template
 * @param key
 * @param placeholders
 * @returns {void|string|*}
 */
const replaceScalarPlaceholders = (template, key, placeholders) =>
    strReplaceAll(template, `{{${key}}}`, placeholders[key]);

/**
 *
 * @param template
 * @param key
 * @param placeholders
 * @returns {*}
 */
const replaceVectorPlaceholders = (template, key, placeholders) => {
    const matchesProps = template.match(
        new RegExp(`{{${key}\\.(\\w+)}}`)
    );
    const matchesMethods = template.match(
        new RegExp(`{{${key}\\.(\\w+)\\(\\)}}`)
    );

    if (matchesProps) {
        template = strReplaceAll(template, matchesProps[0], placeholders[key][matchesProps[1]]);
    }

    if (matchesMethods) {
        template = strReplaceAll(
            template,
            matchesMethods[0].replace('(', '\\(').replace(')', '\\)'),
            placeholders[key][matchesMethods[1]]()
        );
    }

    return template;
};

/**
 *
 * @param template
 * @param key
 * @param placeholders
 * @returns {*}
 */
const replaceIterations = (template, key, placeholders) => {
    const matches = template.match(
        new RegExp(`{{startIteration\\(${key}\\) => (\\w+)}}(.*?){{endIteration\\(${key}\\)}}`)
    );

    return matches ?
        template.replace(
            matches[0],
            [...placeholders[key]].reduce((carry2, item) =>
                carry2 + replacePlaceholders(
                matches[2],
                Object.assign(placeholders, {[matches[1]]: item})
                ),
                ''
            )
        ) :
        template;
};

/**
 * Prepares a template (removes line breaks)
 * @param template
 * @returns {void|string|*}
 */
const prepareTemplate = template => template.replace(/\r|\n/g, '');

/**
 * Replaces all occurrences of a substring in a string
 * @param str
 * @param find
 * @param replace
 * @returns {void|string|*}
 */
export const strReplaceAll = (str, find, replace) => str.replace(new RegExp(find, 'g'), replace);