/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'barlow' : 'Barlow Semi Condensed'
      },
      keyframes: {
        slidingLeft: {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0%'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '100%'
          }
        },

        slidingRight: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0%'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '100%'
          }
        },

        
        buttonGoRight: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0%'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '100%',
            color: '#11161E',
            'background-color': 'white',
            'font-weight': '500'
          }
        },

        buttonGoLeft: {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0%'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '100%',
            color: '#11161E',
            'background-color': 'white',
            'font-weight': '500'
          }
        }

        

      },
      animation: {
        slidingLeft: 'slidingLeft 1s 1 alternate',
        slidingRight: 'slidingRight 1s 1 alternate',
        buttonGoRight: 'buttonGoRight 1s 1',
        buttonGoLeft: 'buttonGoLeft 1s 1'

      }
    },
  },
  plugins: [],
}