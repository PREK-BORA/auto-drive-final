/** @type {import('tailwindcss').Config} */
// Tailwind CSS configuration.
// We disable the preflight (base reset) because Material UI
// already provides its own CSS reset. This prevents conflicts.
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark blue theme used across the app
        primary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#1e88e5',
          600: '#1976d2',
          700: '#1565c0',
          800: '#0d47a1',
          900: '#062b6b',
          950: '#01193b',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  corePlugins: {
    preflight: false, // Material UI provides its own reset
  },
  plugins: [],
}
