/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#F0F9FF',
        primary: '#0369A1',
        secondary: '#38BDF8',
        accent: '#16A34A',
        foreground: '#0C4A6E',
        muted: '#E7EFF5',
        border: '#E0F2FE',
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Raleway', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
