import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dracula"],
  },
  theme: {
    extend: {},
  },
} satisfies Config;
