import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#f4efe8",
        pearl: "#fbf7f2",
        ink: "#171311",
        mist: "#e9dfd4",
        taupe: "#b8a99a",
        bronze: "#a67c52",
        ruby: "#7f2d37",
        plum: "#433038"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"]
      },
      boxShadow: {
        veil: "0 20px 70px rgba(34, 22, 15, 0.07)"
      },
      letterSpacing: {
        hero: "-0.045em"
      },
      backgroundImage: {
        haze:
          "radial-gradient(circle at top left, rgba(166,124,82,0.18), transparent 30%), radial-gradient(circle at 80% 10%, rgba(127,45,55,0.12), transparent 22%), linear-gradient(180deg, #faf6f0 0%, #f4efe8 48%, #efe8df 100%)"
      }
    }
  },
  plugins: []
};

export default config;
