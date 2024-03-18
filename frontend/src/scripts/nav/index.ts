import {createElement} from "@/functions/dom.ts";

const addNav = async () => {
  const html = await fetch("src/components/_navbar.html").then((data) =>
    data.text()
  );
  const contentNav = html.slice(
    html.indexOf(
      "<div class='mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 xl:px-28'>"
    )
  );
  const nav = createElement("nav", {
    class: "bg-white shadow sticky z-50 w-full",
  });
  nav.innerHTML = contentNav;
  const body = document.querySelector("body");
  body?.prepend(nav);
};

function handleSearchInNav() {
  const searchInput = document.getElementById("nav-search") as HTMLInputElement;
  searchInput.addEventListener("input", () => {
    console.log(searchInput.value);
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
