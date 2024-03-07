/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js,ts}"],
  theme: {
    extend: {
  colors:{
    secondary:"F5F5F5"
  }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

