const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Overlock', ...defaultTheme.fontFamily.serif],
        'sans': ['Open Sans', ...defaultTheme.fontFamily.sans]
      },
     keyframes: {
        glow: {
          from: { textShadow: "-1px 1px 12px rgb(233,228,6)" },
          to: {   textShadow: "-1px 1px 12px rgb(24,96,167)" },
        }
     },
      animation: {
        glow: 'glow 10s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}