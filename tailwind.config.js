/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        orange: {
          10: '#fe8e26'
        },
      }

    },
  },
  plugins: [],
};
