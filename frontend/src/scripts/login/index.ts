import '@/scripts/nav/index.ts'
import '@/scripts/footer/index.ts'

function handleLoginForm() {
  const form = document.getElementById("login-form") as HTMLFormElement;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);
  });
}

handleLoginForm();
