/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/**/*.{html,ts}"
    ],
    theme: {
      extend: {
        animation: {
          fadeIn: 'fadeIn 0.3s ease-in-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0', transform: 'translateY(-10px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
        },
      },
    },
    plugins: [],
  }