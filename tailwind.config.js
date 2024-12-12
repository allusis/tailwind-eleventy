/** @type {import('tailwindcss').Config} */
export default {
  content: ["public/*.{html,js,njk}"],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
