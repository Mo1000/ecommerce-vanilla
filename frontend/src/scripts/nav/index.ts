import {createElement} from "@/functions/dom.ts";

const addNav = async () => {

  const nav = createElement("nav", {
    class:"bg-white shadow sticky z-50 w-full"
  })
  nav.innerHTML=`   
   <div class='mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 xl:px-28'>
            <div class="-ml-2 mr-2 flex items-center md:hidden">
                <button aria-controls="mobile-menu" aria-expanded="false"
                        class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        type="button">
                    <span class="absolute -inset-0.5"></span>
                    <span class="sr-only">Open main menu</span>
                    <svg aria-hidden="true" class="block h-6 w-6" fill="none" stroke="currentColor"
                         stroke-width="1.5" viewBox="0 0 24 24">
                        <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div class="font-bold text-2xl ">
                <a href="/" class="hover:text-gray-700"> Exclusive</a>
            </div>
            <div class="hidden md:ml-6 md:flex md:space-x-8" id="routes-link">
                <a class="inline-flex text-gray-500  items-center  px-1 pt-1  text-sm  font-medium "
                   href="/"
                   id="home-link"
                >Home</a>
                <a class="inline-flex items-center  px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                   href="#"
                   id="contact-link"
                >Contact</a>
                <a class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                   href="#"
                   id="about-link"
                >About</a>
                <a class="inline-flex items-center  px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                   href="/register"
                   id="register-link"
                >Sign Up</a>
            </div>

            <form class="relative" id="nav-search" method="POST">
                <!--            <div class="pointer-events-none absolute   inset-y-0 right-0 flex items-center pr-3">-->
                <!--                <svg aria-hidden="true" class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">-->
                <!--                    <path clip-rule="evenodd"-->
                <!--                          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"-->
                <!--                          fill-rule="evenodd"/>-->
                <!--                </svg>-->
                <!--            </div>-->
                <label for="nav-input">
                    <input class="w-64 p-3 bg-gray-100 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                           id="nav-input" name="inputNav"
                           placeholder="What are you looking for?" type="search">
                </label>
            </form>
        </div>
`
  const body = document.querySelector("body");
  body?.prepend(nav);
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
