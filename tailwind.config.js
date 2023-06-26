import font from "../../../icons/Nunito-Regular.ttf"

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'primary': '#4B4AEF',
        'secondary': '#FFCA1D',
        'accent': '#3ADAD9',
        'text': '#363A3D',
      },
      fontFamily: {
        'nunito': ['nunito', 'sans-serif'],
        'custom': ['CustomFont'],
      },

      animation: {
        'fade-up': 'fadeUp 1s ease-in-out forwards',
        'progressload': 'progressbar 1s ease-in-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        progressbar: {
          '0%': { width: '0%' },
        },
      },

    },
  },
  plugins: [],
}

