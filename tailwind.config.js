module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'theme-black': '#0f1108',
        'theme-pink': '#e94967',
        'theme-gold': '#ffba08',
        'theme-white': '#f7f7ff',
        'theme-blue': '#235789',
      },
      fontFamily: {
        'heading': ['"Game of Thrones"'],
        'body': ['"Rise of Kingdom"'],
        'sub-heading': ['"Rajdhani"'],
        'text': ['"Barlow"'],
      },
      fontSize: {
        'xxs': '.50rem',
      }
    },
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
