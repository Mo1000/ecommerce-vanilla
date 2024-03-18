export function createElement(tagName: string, attributes: {
    class?: string,
    [key: string]: any,
} = {},text?:string) {
    const element = document.createElement(tagName);
    for (const key in attributes) {
        const value = attributes[key];
        if (value !== null )
            element.setAttribute(key, value);
    }
    if (text) {
        element.innerText = text;
    }
    return element;
}

export function cloneTemplate(id:string) {
    const template = document.getElementById(id) as HTMLTemplateElement;
    return template.content.cloneNode(true);
}
