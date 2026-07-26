import typography from "@tailwindcss/typography"
import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
      serif: ["Iowan Old Style", "Baskerville", "Times New Roman", "serif"],
      mono: ["var(--font-geist-mono)", ...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
      },
    },
  },
  plugins: [typography],
}

export default config
