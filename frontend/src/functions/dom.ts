export function createElement(tagName: string, attributes: {
    [key: string]: any,
} = {}) {
    const element = document.createElement(tagName);
    for (const key in attributes) {
        const value = attributes[key];
        if (value !== null )
            element.setAttribute(key, value);
    }
    return element;
}

export function cloneTemplate(id:string) {
    const template = document.getElementById(id) as HTMLTemplateElement;
    return template.content.cloneNode(true);
}
