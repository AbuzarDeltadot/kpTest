const colors = {
  'primary': '#163a92',
  'primary-dark': '#102d75',
  'secondary': '#30c4c2',
  'azure': '#F0F9F9',
  'darkgray': '#707070',
  'gray1':'#F4F4F4',
  'bannerdark':'#00000033'
}
export default {
  theme: {
    extend: {
      colors,
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        bebas: ['bebas', 'cursive'],
      },
      aspectRatio: {
        '16/5.9': '16 / 5.9',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/typography'),
  ],
  content: [
    './node_modules/flowbite/**/*.{js,ts}',
  ],
}
