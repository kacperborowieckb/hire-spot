import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    backgroundSize: {
      "50%": "50%",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        main: {
          "50": "#eef0ff",
          "100": "#e0e3ff",
          "200": "#c7cbfe",
          "300": "#a5a9fc",
          "400": "#8580f9",
          "500": "#7262f2",
          "600": "#6446e6",
          "700": "#5537cb",
          "800": "#452fa4",
          "900": "#3c2e81",
          "950": "#241B4B",
        },
        text: {
          primary: "#313131",
          secondary: "#515151",
        },
        error: {
          bg: "hsl(359, 100%, 97%)",
          "border-light": "hsl(359, 100%, 94%)",
          "border-dark": "hsl(360, 100%, 45%)",
          text: "hsl(360, 100%, 45%)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
