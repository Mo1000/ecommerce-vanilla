interface IconElementModel {
    attr:NonNullable<any>
    child: any[]
    [key: string]: any
}

export function createSVGElement(iconData: IconElementModel) {
    // Create the SVG element
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    if(!iconData.attr["width"]){
        svg.setAttribute("width", "20px");
    }
    if(!iconData.attr["height"]){
        svg.setAttribute("height", "20px");
    }

    // Set attributes
    for (const attribute in iconData.attr) {
        if (iconData.attr.hasOwnProperty(attribute)) {
            if (attribute === "style" && typeof iconData.attr[attribute] === "object") {
                let style = "";
                for (const key in iconData.attr[attribute]) {
                    style += `${key}:${iconData.attr[attribute][key]}; `;
                }
                svg.setAttribute(attribute, style);
            } else
                svg.setAttribute(attribute, iconData.attr[attribute]);
        }
    }

    // Create child elements recursively
    function createChildElements(parent: any, childData: IconElementModel[]) {
        for (let i = 0; i < childData.length; i++) {
            let childDataItem = childData[i];
            let child = document.createElementNS("http://www.w3.org/2000/svg", childDataItem.tag);
            for (let childAttr in childDataItem.attr) {
                if (childDataItem.attr.hasOwnProperty(childAttr)) {
                    child.setAttribute(childAttr, childDataItem.attr[childAttr]);
                }
            }
            if (childDataItem.child) {
                createChildElements(child, childDataItem.child);
            }
            parent.appendChild(child);
        }
    }

    // Create child elements recursively
    createChildElements(svg, iconData.child);

    return svg;
}


