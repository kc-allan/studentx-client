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
        foreground: '#262628',
        // Brand colors
        brand: {
          primary: '#DB0271',       // Vibrant pink
          secondary: '#0000EE',    // Classic blue
          accent: '#148CFC',       // Bright blue
          danger: '#C72310',      // Alert red
        },

        // Neutral colors
        neutral: {
          darkest: '#000000', // Black
          darker: '#161616', // Dark gray
          dark: '#262628', // Gray 
          medium: '#596168', // Medium gray
          light: '#4C5359', // Light gray
          lighter: '#D8D8D8', // Light gray
          lightest: '#E2E2E2', // Very light gray
        },

        // Background colors
        background: {
          DEFAULT: '#FFFFFF', // White
          light: '#FEFEFE', // Off-white
          lighter: '#FAFBFC', // Very light gray
          subtle: '#F4F4F4', // Light gray
          muted: '#F0F4F8', // Soft gray
          soft: '#E1E9F0', // Soft blue-gray
          softer: '#E0E9F0', // Very soft blue-gray
        },

        // Text colors
        text: {
          primary: '#262628', // Dark gray
          secondary: '#596168', // Medium gray
          tertiary: '#4C5359', // Light gray
          inverted: '#FFFFFF', // White
          link: '#0000EE', // Classic blue
          hover: '#148CFC', // Bright blue
          danger: '#C72310', // Alert red
        },

        // Border colors
        border: {
          DEFAULT: '#E6E6E6', // Light gray
          strong: '#D8D8D8', // Medium gray
          subtle: '#F0F4F8', // Soft gray
          accent: '#148CFC', // Bright blue
          danger: '#C72310', // Alert red
        },

        // Functional colors
        destructive: {
          DEFAULT: '#C72310',
          foreground: '#FFFFFF',
        },
        success: {
          DEFAULT: '#28A745', // Added for completeness
          foreground: '#FFFFFF',
        },
        warning: {
          DEFAULT: '#FFC107', // Added for completeness
          foreground: '#262628',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
        full: '9999px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'pulse-light': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-light': 'pulse-light 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;