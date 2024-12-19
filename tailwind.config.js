/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      padding: {
        primaryPaddingY: 'var(--primary-y)',
        primaryPaddingX: 'var(--primary-x)',
      },
      backgroundColor: {
        primaryBg: "rgba(255, 255, 255, 0.16)"
      },
      dropShadow: {
        DEFAULT: "0 1px 3px rgba(0, 0, 0, 0.9)",
      },
    },
  },
  plugins: [],
}

