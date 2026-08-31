/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#030712",
          card: "rgba(11, 15, 26, 0.7)",
          border: "rgba(6, 182, 212, 0.15)",
          borderHover: "rgba(6, 182, 212, 0.35)",
          primary: "#06b6d4", // Glowing Cyan
          secondary: "#a855f7", // Glowing Purple
          accent: "#10b981", // Safety Green
          warning: "#f59e0b", // Amber warning
          danger: "#ef4444", // Clicked Alert Red
          darkGray: "#0b0f1a",
          darkerGray: "#060913",
        }
      },
      boxShadow: {
        'glow-primary': '0 0 15px rgba(6, 182, 212, 0.35)',
        'glow-secondary': '0 0 15px rgba(168, 85, 247, 0.35)',
        'glow-accent': '0 0 15px rgba(16, 185, 129, 0.35)',
        'glow-danger': '0 0 15px rgba(239, 68, 68, 0.45)',
        'cyber-inset': 'inset 0 0 12px rgba(6, 182, 212, 0.1)',
      },
      backgroundImage: {
        'cyber-gradient': 'radial-gradient(circle at 50% 50%, #0d1527 0%, #030712 100%)',
        'neon-conic': 'conic-gradient(from 180deg at 50% 50%, #06b6d4 0deg, #a855f7 180deg, #06b6d4 360deg)',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'cyber-scan': 'scan 6s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        }
      }
    },
  },
  plugins: [],
}
