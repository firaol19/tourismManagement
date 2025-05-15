import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/destinationComponent/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/adminComponents/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/reviewComponents/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/messageComponents/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'role-select', // ensure the base class is not purged
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#fafaf9",
        foreground: "#171717",
        primary: "#a0c878",     // new main green
        secondary: "#ddeb9d",   // new soft green
        main: "#7aa45a",        // supportive deep green
        text: "#3e4d2c",        // olive readable text
        accent: "#bfdc96",      // light green accent
        foreground2: "#ededed",
        background2: "#2c2c2c",
        primary2: "#6d8c4e",    // dark version of green
        secondary2: "#94ae70",
        main2: "#1f2910",
        text2: "#f5f5f5",
        accent2: "#8ea86b",
        
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"], // Add your custom font
        openSans: ["Open Sans", "sans-serif"],
      },
      screens: {
        'xs' : '400px'
      },
      animation:{
        move: "move 0.6s ease-in-out",
      },
      
      keyframes:{
        move: {
          "0%, 49%": {opacity: "0", zIndex: "1"},
          "50%, 100%": {opacity: "1", zIndex: "5"},
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
