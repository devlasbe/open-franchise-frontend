import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        noto: ["var(--noto)"],
      },
      fontSize: {
        h1: ["32px", { lineHeight: "44px", letterSpacing: "-0.5px", fontWeight: "700" }],
        h2: ["28px", { lineHeight: "40px", letterSpacing: "-0.5px", fontWeight: "700" }],
        h3: ["22px", { lineHeight: "34px", letterSpacing: "-0.5px", fontWeight: "700" }],
        subtitle1: ["18px", { lineHeight: "26px", letterSpacing: "-0.5px", fontWeight: "700" }],
        subtitle2: ["16px", { lineHeight: "24px", letterSpacing: "-0.5px", fontWeight: "700" }],
        subtitle3: ["15px", { lineHeight: "23px", letterSpacing: "-0.5px", fontWeight: "700" }],
        body: ["14px", { lineHeight: "20px", letterSpacing: "-0.5px", fontWeight: "700" }],
        caption1: ["12px", { lineHeight: "18px", letterSpacing: "-0.5px", fontWeight: "700" }],
        caption2: ["10px", { lineHeight: "15px", letterSpacing: "-0.5px", fontWeight: "700" }],
        textbody: ["15px", { lineHeight: "26px", letterSpacing: "-0.5px", fontWeight: "700" }],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
};
export default config;
