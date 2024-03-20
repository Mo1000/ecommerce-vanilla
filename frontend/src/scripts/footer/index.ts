import {cloneTemplate, createElement} from "@/functions/dom.ts";

const addFooter = async () => {
    const html = await fetch("src/components/_footer.html").then((data) =>
        data.text()
    );
    const templateContainer = createElement("div")
    templateContainer.innerHTML = html

    const template=  cloneTemplate("footer-template", templateContainer)

    const body = document.querySelector("body") as HTMLBodyElement;
    body.appendChild(template);
};

function handleSearchInFooter() {
    const searchForm = document.getElementById("footer-search") as HTMLFormElement;
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const formData = new FormData(searchForm);
        const data = Object.fromEntries(formData);
        console.log(data)
    });
}

await addFooter()
handleSearchInFooter()
