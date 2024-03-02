/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    screens: {
      'sm': '320px',  // Modify the 'sm' breakpoint to a smaller value (e.g., 320px)
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
}