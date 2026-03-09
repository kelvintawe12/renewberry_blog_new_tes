
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0891B2',
          hover: '#0E7490',
        },
        secondary: {
          DEFAULT: '#134E4A',
          hover: '#115E59',
        },
        surface: '#FFFFFF',
        border: '#E5E7EB',
        text: {
          primary: '#111827',
          secondary: '#4B5563',
          muted: '#6B7280',
        }
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Georgia', 'serif'],
      },
      maxWidth: {
        blog: '1200px',
      }
    },
  },
  plugins: [],
}
