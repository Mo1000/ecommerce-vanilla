import {createElement} from "@/functions/dom.ts";
import {UserService} from "@/services/user.service.ts";
import {signal} from "@preact/signals-core";
import {UserModel} from "@/models/user.model.ts";
import {getCookieValue, removeCookie} from "@/utils/storage/manageCookies.ts";
import {USER_COLOR_COOKIE_NAME, USER_JWT_TOKEN_COOKIE_NAME,} from "@/constants";
import {createAvatar} from "@dicebear/core";
import {identicon} from "@dicebear/collection";
import {randomColor} from "@/utils/randomColor.ts";
import {createSVGElement} from "@/utils";
import {FiShoppingCart, heartIconOutline} from "@/constants/icons.ts";
import {notify} from "@/utils/notify.ts";

const pathname = window.location.pathname.slice(1);

const addNav = async () => {
  const nav = createElement("nav", {
    class: "bg-white shadow sticky z-50 w-full top-0",
  });
  nav.innerHTML = `   
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
                   href="/login"
                   id="login-link"
                >Log In</a>
            </div>

            <form class="relative" id="nav-search" method="POST">          
                <label for="nav-input">
                    <input class="w-64 p-3 bg-gray-100 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                           id="nav-input" name="inputNav"
                           placeholder="What are you looking for?" type="search">
                </label>
            </form>
            
      
      </div>
        </div>
`;

  // Manage user connected
  try {
    const res = await UserService.getUser();
    if (pathname === "login" || pathname === "register") {
      window.location.href = "/";
    }

    // Hidden login section
    const loginLink = nav.querySelector("#login-link") as HTMLAnchorElement;
    loginLink.className = "hidden";

    const user = signal<UserModel | undefined>(res.data || undefined);
    const userColor = getCookieValue(USER_COLOR_COOKIE_NAME);


    //handle avatar
    const avatar = createAvatar(identicon, {
      seed: user.value?.username || "Ecommerce",
      backgroundColor: ["gradientLinear","solid",userColor || randomColor()],
      radius: 50,
    }).toDataUriSync();

    const divUserConnected = createElement("div", {
      class: "px-3 flex gap-6 items-center",
    });

    //handle svg
    const attr = {
      class: "w-7 h-7 cursor-pointer",
    };
    const heartSvg = createSVGElement(heartIconOutline, attr);
    const svgShopping = createSVGElement(FiShoppingCart, attr);

    //handle avatar img and dropdown option
    const containerImgAvatar = createElement("div", {
      class: "relative",
    });

    const imgAvatar = createElement("img", {
      alt: "avatar-user",
      width: 36,
      height: 36,
      class:
        "h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-xl cursor-pointer",
      src: avatar,
    });

    const dropdown = createElement("div", {
      class:
        "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
      role: "menu",
      "aria-orientation": "vertical",
      "aria-labelledby": "user-menu-button",
      tabindex: "-1",
    });
    dropdown.innerHTML = `
            <a href="/account" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Manage My Account</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">My Order</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2" >My Cancellations</a>        
            <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-3" >My Reviews</a>        
            <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-4" >Logout</a>        
        `;

    const logoutAnchor = dropdown.querySelector(
      "#user-menu-item-4"
    ) as HTMLAnchorElement;

    logoutAnchor.addEventListener("click", logout);

    // handle dropdown
    const showDropdown = signal<boolean>(false);

    imgAvatar.addEventListener("click", () => {
      showDropdown.value = !showDropdown.value;
    });


    showDropdown.subscribe((value) => {
      if (value) {
        dropdown.classList.remove("hidden");
      } else {
        dropdown.classList.add("hidden");
      }
    });


    //append element to container Avatar
    containerImgAvatar.appendChild(imgAvatar);
    containerImgAvatar.appendChild(dropdown);

    divUserConnected.appendChild(heartSvg);
    divUserConnected.appendChild(svgShopping);
    divUserConnected.appendChild(containerImgAvatar);
    const form = nav.querySelector("#nav-search") as HTMLFormElement;

    form.insertAdjacentElement("afterend", divUserConnected);
  } catch (e) {
    console.log("error to get user");
  }

  const body = document.querySelector("body") as HTMLBodyElement;
  body.prepend(nav);
};

function handleSearchInNav() {
  const searchForm = document.getElementById("nav-search") as HTMLFormElement;
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);
    const data = Object.fromEntries(formData);
    console.log(data);
  });
}

function handleActiveLink() {
  const div = document.querySelector("#routes-link");
  Array.from(div?.children as HTMLCollection).forEach((link) => {
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

const logout = (e: MouseEvent) => {
  e.preventDefault();
  removeCookie(USER_JWT_TOKEN_COOKIE_NAME);
  notify("You are disconnected", {
    type: "success",
  });
  window.location.href = "/";
};

await addNav();
handleActiveLink();
handleSearchInNav();
