/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}", // هذا السطر يسمح بقراءة ملف page.js في الصفحة الرئيسية
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
