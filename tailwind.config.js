/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#F8FAFF',
        primary: '#0EA5E9',
        secondary: '#38BDF8',
        accent: '#22D3EE',
        foreground: '#1E293B',
        muted: '#F1F5F9',
        border: '#E2E8F0',
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Raleway', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
