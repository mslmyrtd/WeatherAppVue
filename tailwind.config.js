module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // colors: {
      //   sidebar: 'rgb(17,24,39)',
      //   dark: '#001529',
      //   'd-white': 'rgb(254,254,254)',
      //   'd-gray-950': 'rgb(25,25,39)',
      //   'd-gray-800': 'rgb(31,41,55)',
      //   'd-gray-300': 'rgb(209,213,219)',
      // },
      spacing: {
        18: '72px',
        70: '270px',
      },
    },
  },
  plugins: [],
};