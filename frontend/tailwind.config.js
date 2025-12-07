export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1a73e8',
        secondary: '#f5f5f5',
        accent: '#e0e0e0',
        background: '#ffffff',
        text: '#202020',
        border: '#e0e0e0',
        success: '#4caf50',
        danger: '#f44336'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      spacing: {
        '12': '3rem',
        '14': '3.5rem',
        '18': '4.5rem',
        '24': '6rem'
      },
      borderRadius: {
        'lg': '0.5rem',
        'xl': '1rem'
      }
    }
  },
  plugins: []
};
