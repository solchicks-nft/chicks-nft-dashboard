module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        icielstabile: 'ICielStabile, sans-serif',
        proximanovabold: 'ProximaNovaBold, sans-serif',
        proximanovaregular: 'ProximaNovaRegular, sans-serif',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('flowbite/plugin')],
};
