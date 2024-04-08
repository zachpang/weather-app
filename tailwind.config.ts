import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import colors from "tailwindcss/colors";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.slate[700],
        secondary: colors.zinc[500],
        "theme-color": "#4CA1AF",
        "white-alpha-50": "rgba(255, 255, 255, 0.3)",
      },
    },
  },
  plugins: [forms],
} satisfies Config;
