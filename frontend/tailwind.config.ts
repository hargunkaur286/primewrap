
import type { Config } from "tailwindcss";

const PRIME = {
  yellow: "#FFE569",
  amber: "#FFB22C",
  orange: "#FB9224",
  black: "#000000",
} as const;

const PRIME_SCALE = {
  50: PRIME.yellow,
  100: PRIME.yellow,
  200: PRIME.amber,
  300: PRIME.amber,
  400: PRIME.amber,
  500: PRIME.orange,
  600: PRIME.orange,
  700: PRIME.orange,
  800: PRIME.black,
  900: PRIME.black,
} as const;

const PRIME_TEXT_SCALE = {
  50: PRIME.yellow,
  100: PRIME.yellow,
  200: PRIME.amber,
  300: PRIME.orange,
  400: PRIME.orange,
  500: PRIME.black,
  600: PRIME.black,
  700: PRIME.black,
  800: PRIME.black,
  900: PRIME.black,
} as const;

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Clash Display', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Updated brand palette (only uses: #FFE569, #FFB22C, #FB9224, #000000)
        sage: {
          50: PRIME.yellow,
          100: PRIME.yellow,
          200: PRIME.yellow,
          300: PRIME.yellow,
          400: PRIME.amber,
          500: PRIME.amber,
          600: PRIME.orange,
          700: PRIME.orange,
          800: PRIME.black,
          900: PRIME.black,
        },
        kraft: PRIME_SCALE,
        charcoal: PRIME_TEXT_SCALE,
        'prime-blue': PRIME_SCALE,
        'forest-green': PRIME_SCALE,

        // Override common Tailwind color names used across the app
        emerald: PRIME_SCALE,
        cyan: PRIME_SCALE,
        teal: PRIME_SCALE,
        green: PRIME_SCALE,
        blue: PRIME_SCALE,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(251, 146, 36, 0.25)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 178, 44, 0.45)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-up": "slide-up 0.8s ease-out",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
      },
      backdropBlur: {
        xs: '2px',
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
