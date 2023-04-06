/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'poppins': 'Work Sans'
      },
      colors: {
        'dark-bg': '#1a1a1a',
        'bg-secondary': '#2b2b2b',
        'border-gray': '#383838',
      }
    },
  },
  plugins: [],
}
