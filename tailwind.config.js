/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Custom organic colors mapping to Gavriel's portfolio theme
        brand: {
          DEFAULT: '#2d5016', // Forest green
          light: '#edf5e5',   // Light green background
          textLight: '#2d5016',
          dark: '#7ab84a',    // Bright green for dark mode
          textDark: '#9dd468',
          darkBg: '#1a2e0a',  // Dark green background for dark mode badges
        },
        customBg: {
          light: '#f8f7f4',   // Warm soft white
          dark: '#111210',    // Slate/charcoal olive black
          darkCard: '#1a1b19', // Slightly lighter dark for cards
          lightCard: '#ffffff',
          darkAccent: '#181917',
          lightAccent: '#f0ede8',
        },
        customText: {
          light: '#1a1916',
          dark: '#f0ede8',
          mutedLight: '#5a5750',
          mutedDark: '#a8a49e',
          subLight: '#9a9690',
          subDark: '#6a6660',
        }
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
      }
    },
  },
  plugins: [],
}