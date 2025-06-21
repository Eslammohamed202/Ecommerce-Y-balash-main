/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true, // يخلي الـ container في المنتصف تلقائيًا
      padding: '1rem', // padding داخلي افتراضي
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px', // تقدر تغير القيم لو حابب
      },
    },
    extend: {
      colors: {
        Main: "#1C573E",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
