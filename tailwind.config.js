/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        'surface': '#f9f9f9',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f2f4f4',
        'surface-container': '#ebeeef',
        'on-surface': '#2d3435',
        'primary': '#5f5e5e',
        'primary-dim': '#535252',
        'on-primary': '#ffffff',
        'tertiary': '#765a3e',
        'tertiary-fixed': '#f9d3b0',
        'outline-variant': 'rgba(45, 52, 53, 0.2)',
      },
      boxShadow: {
        'ambient': '0 20px 40px rgba(45, 52, 53, 0.06)',
      },
      borderRadius: {
        'sm': '4px',
      }
    },
  },
  plugins: [],
}