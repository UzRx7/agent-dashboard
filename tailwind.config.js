/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#080C14",
          card: "rgba(17, 24, 39, 0.65)",
          border: "rgba(255, 255, 255, 0.08)",
          purple: "#8B5CF6",
          purpleHover: "#7C3AED",
          purpleGlow: "rgba(139, 92, 246, 0.25)",
          cyan: "#06B6D4",
          cyanGlow: "rgba(6, 182, 212, 0.25)",
          emerald: "#10B981",
          emeraldGlow: "rgba(16, 185, 129, 0.25)",
          ruby: "#EF4444",
          rubyGlow: "rgba(239, 68, 68, 0.25)",
          amber: "#F59E0B",
          amberGlow: "rgba(245, 158, 11, 0.25)"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Outfit", "sans-serif"],
        mono: ["Fira Code", "Courier New", "monospace"]
      },
      boxShadow: {
        premium: "0 10px 30px -10px rgba(0, 0, 0, 0.7)",
        purpleGlow: "0 0 15px rgba(139, 92, 246, 0.35)",
        cyanGlow: "0 0 15px rgba(6, 182, 212, 0.35)"
      }
    },
  },
  plugins: [],
};
