/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./app/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "brand": {
          50: "#DEEAFC",
          100: "#C2D7FA",
          200: "#85B0F5",
          300: "#4888EF",
          400: "#1362E1",
          500: "#0E46A3",
          600: "#0B3984",
          700: "#082B63",
          800: "#061D42",
          900: "#030E21",
          950: "#01060E"
        },
        "neutrals": {
          50: "#F2F2F2",
          100: "#E3E3E3",
          200: "#C7C7C7",
          300: "#ADADAE",
          400: "#919192",
          500: "#757576",
          600: "#5E5E5F",
          700: "#474748",
          800: "#2E2E2E",
          900: "#171717",
          950: "#0D0D0D"
        },
        "green": {
          50: "#EEFCE8",
          100: "#D9F9CD",
          200: "#B4F39B",
          300: "#8EED69",
          400: "#69E737",
          500: "#4ECF19",
          600: "#3DA414",
          700: "#2D7B0F",
          800: "#1E520A",
          900: "#0F2905",
          950: "#081703"
        },
        "red": {
          50: "#FCE8E8",
          100: "#F9CDCD",
          200: "#F39B9B",
          300: "#ED6969",
          400: "#E73737",
          500: "#CF1919",
          600: "#A41414",
          700: "#7B0F0F",
          800: "#520A0A",
          900: "#290505",
          950: "#170303"
        },
        "orange": {
          50: "#FFF2EB",
          100: "#FFE1D1",
          200: "#FFC3A3",
          300: "#FFA575",
          400: "#FF8847",
          500: "#FF6D1C",
          600: "#E04F00",
          700: "#A83B00",
          800: "#702700",
          900: "#381400",
          950: "#1F0B00"
        },
        "white": {
          500: "#FFFFFF"
        }

      },
      fontFamily: {
        sans: ["Montserrat-Regular"]
      },
      fontSize: {
        'h1': "61px",
        'h2': "49px",
        'h3': "39px",
        'h4': "31px",
        'h5': "25px",
        "title": "20px",
        "title2": "16px",
        "body": "13px",
        "caption": "10px"
      }
    },
  },
  plugins: [],
}