function handleSearch() {
    const searchInput = document.getElementById("nav-search") as HTMLInputElement;
    searchInput.addEventListener("input", () => {
        console.log(searchInput.value);
    });
}


function handleLoginForm() {
    const form = document.getElementById("login-form") as HTMLFormElement;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log(data);
    });
}


handleSearch()
handleLoginForm();

