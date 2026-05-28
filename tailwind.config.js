/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ud: {
          green: '#0F6E56',        
          'green-light': '#E1F5EE', 
          'green-mid': '#1D9E75',   
          dark: '#2C2C2A',         
          muted: '#5F5E5A',        
          danger: '#A32D2D',       
          amber: '#BA7517',        
          bg: '#F8FAF9'            
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
