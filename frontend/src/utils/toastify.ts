import Toastify from "toastify-js";

interface ToastifyModel extends Omit<Toastify.Options, "text"> {
   readonly type?: "success" | "error" | "info" | "warning"|"default";
}
export function toastify(text: string, options?: ToastifyModel) {

    let backgroundColor=undefined

    if (options?.type) {
        switch (options.type) {
            case "success":
               backgroundColor="#2b713c"
                break;
            case "error":
                backgroundColor= "#86343b"
                break;
            case "info":
              backgroundColor= "#1c5d68"
                break;
            case "warning":
               backgroundColor= "#e6bd41"
                break;
            case "default":
                backgroundColor=undefined
                break;
        }
    }
    return Toastify({
        text: text,
        backgroundColor,
        duration: 5000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        offset: {
            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        ...options
    }).showToast();
}
