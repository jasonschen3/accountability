/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gt-navy': '#003057',
        'gt-gold': '#B3A369',
        'gt-tech-gold': '#EAAA00',
        'gt-gray': '#54585A',
        'gt-light-gold': '#F5F1E8',
      },
      backgroundImage: {
        'gt-gradient': 'linear-gradient(135deg, #003057 0%, #B3A369 100%)',
        'gt-light-gradient': 'linear-gradient(135deg, #F5F1E8 0%, #ffffff 100%)',
      }
    },
  },
  plugins: [],
}