import {handleSearch} from "@/scripts/globals.ts";

function handleLoginForm() {
    const form = document.getElementById("register-form") as HTMLFormElement;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log(data);
    });
}


handleSearch()
handleLoginForm();
