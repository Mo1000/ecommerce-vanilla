import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';

interface IconElementModel {
    attr: NonNullable<any>
    child: any[]
    [key: string]: any
}

export function createSVGElement(iconData: IconElementModel,attributesSvg?:any) {
    // Create the SVG element
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const attributes = {
        ...iconData.attr,
        ...attributesSvg
    }
    if (!attributes["width"]) {
        svg.setAttribute("width", "20px");
    }
    if (!attributes["height"]) {
        svg.setAttribute("height", "20px");
    }

    // Set attributes
    for (const attribute in attributes) {
        if (attributes.hasOwnProperty(attribute)) {
            if (attribute === "style" && typeof attributes[attribute] === "object") {
                let style = "";
                for (const key in attributes[attribute]) {
                    style += `${key}:${attributes[attribute][key]}; `;
                }
                svg.setAttribute(attribute, style);
            } else
                svg.setAttribute(attribute, attributes[attribute]);
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




export const cloudinaryInstance = new Cloudinary({
    cloud: {
        cloudName: import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME,
        apiKey: import.meta.env.VITE_PUBLIC_CLOUDINARY_API_KEY,
        apiSecret: import.meta.env.VITE_PUBLIC_CLOUDINARY_API_SECRET,
    },
    url: {
        secure: true,
    },
});

export const optimizeUrl = (image: string): CloudinaryImage => {
    // if (!image?.includes('https://res.cloudinary.com')) return image;
    return cloudinaryInstance
        .image(image.split('upload/')[1])
        .quality('auto')
        .format('webp');
};

