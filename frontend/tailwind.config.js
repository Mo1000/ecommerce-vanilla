import flowBitePlugin from 'flowbite/plugin'
import forms from '@tailwindcss/forms'
import aspectRatio from '@tailwindcss/aspect-ratio'

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
    flowBitePlugin,
    forms,
    aspectRatio,
  ],
  corePlugins: {
    preflight: false,
  },
}

