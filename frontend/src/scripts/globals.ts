export function handleSearch() {
    const searchInput = document.getElementById("nav-search") as HTMLInputElement;
    searchInput.addEventListener("input", () => {
        console.log(searchInput.value);
    });
}
