/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          text: '#1d1d1f',
          accent: '#0066cc',
          border: '#0066cc',
          primary: '#2997ff',
          surface: '#000000',
          background: '#f5f5f7',
          'on-primary': '#ffffff',
          'text-muted': '#000000',
        }
      },
      fontFamily: {
        display: ['SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        body: ['SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'apple-sm': '980px',
      },
      transitionDuration: {
        'fast': '20ms',
        'base': '200ms',
        'slow': '400ms',
      },
      transitionTimingFunction: {
        'apple-easing': 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
      screens: {
        'apple-bp1': '641px',
        'apple-bp2': '735px',
        'apple-bp3': '736px',
        'apple-bp4': '834px',
        'apple-bp5': '1069px',
        'apple-bp6': '1070px',
        'apple-bp7': '1441px',
      }
    },
  },
  plugins: [],
}