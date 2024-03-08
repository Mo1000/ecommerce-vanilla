import flowBitePlugin from 'flowbite/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js,ts}",
    "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
  colors:{
    secondary:"F5F5F5"
  }
    },
  },
  plugins: [
    flowBitePlugin
  ],
  corePlugins: {
    preflight: false,
  },
}

