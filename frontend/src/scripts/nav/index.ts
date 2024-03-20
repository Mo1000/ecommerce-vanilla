import {cloneTemplate, createElement} from "@/functions/dom.ts";

const addNav = async () => {
  const html = await fetch("src/components/_navbar.html").then((data) =>
    data.text()
  );


  const templateContainer = createElement("div");
    templateContainer.innerHTML = html;
  const template = cloneTemplate("nav-template", templateContainer);
  const body = document.querySelector("body");
  body?.prepend(template);
};

function handleSearchInNav() {
  const searchForm = document.getElementById("nav-search") as HTMLFormElement;
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(searchForm);
    const data = Object.fromEntries(formData);
    console.log(data)
  });
}

function handleActiveLink() {
  const div = document.querySelector("#routes-link");
  Array.from(div?.children as HTMLCollection).forEach((link) => {
    const pathname = window.location.pathname.slice(1);
    if (pathname === "") {
      if (link.textContent === "Home") {
        link.classList.add("border-solid");
        link.classList.add("border-0");
        link.classList.add("border-b-2");
        link.classList.add("border-indigo-500");
        link.classList.replace("text-gray-500", "text-gray-900");
        return;
      }
    } else if (link.id.includes(pathname)) {
      link.classList.add("border-solid");
      link.classList.add("border-0");
      link.classList.add("border-b-2");
      link.classList.add("border-indigo-500");
      link.classList.replace("text-gray-500", "text-gray-900");
      return;
    } else {
      link.classList.remove("border-solid");
      link.classList.remove("border-0");
      link.classList.remove("border-b-2");
      link.classList.remove("border-indigo-500");
      link.classList.replace("text-gray-900", "text-gray-500");
      return;
    }
  });
}
await addNav();
handleActiveLink();
handleSearchInNav();
