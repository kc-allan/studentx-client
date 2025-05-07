import type { Config } from "tailwindcss";

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
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#A64D79',
          foreground: '#FFFFFF',
          100: '#EFD5E4',
          200: '#DFACC9',
          300: '#CE82AE',
          400: '#BE5993',
          500: '#A64D79',
          600: '#863E62',
          700: '#6A1E55',
          800: '#4D1B3E',
          900: '#3B1C32',
        },
        secondary: {
          DEFAULT: '#6A1E55',
          foreground: '#FFFFFF',
          100: '#E8D0DE',
          200: '#D1A2BE',
          300: '#B9739D',
          400: '#A64D79',
          500: '#8A2A67',
          600: '#6A1E55',
          700: '#541943',
          800: '#3B1C32',
          900: '#231920',
        },
        accent: {
          DEFAULT: '#3B1C32',
          foreground: '#FFFFFF',
          100: '#DBC5D3',
          200: '#B78CA8',
          300: '#93537C',
          400: '#6A1E55',
          500: '#57234A',
          600: '#3B1C32',
          700: '#2D1826',
          800: '#1F1119',
          900: '#1A1A1D',
        },
        highlight: {
          DEFAULT: '#BE5993',
          foreground: '#FFFFFF',
          100: '#EFD5E4',
          200: '#DFACC9',
          300: '#CE82AE',
          400: '#BE5993',
          500: '#A64D79',
          600: '#8A2A67',
          700: '#6A1E55',
          800: '#541943',
          900: '#3B1C32',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'pulse-light': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-light': 'pulse-light 2s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;