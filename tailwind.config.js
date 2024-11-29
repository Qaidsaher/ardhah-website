// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure all relevant files are included
  ],
  theme: {
    extend: {
      // Example: Adding custom colors
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A',
      },
    },
  },
  plugins: [],
};
