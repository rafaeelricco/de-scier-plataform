const config = {
   content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}'
   ],
   theme: {
      container: {
         center: true,
         padding: '2rem',
         screens: {}
      },
      screens: {
         tablet: '640px',
         // => @media (min-width: 640px) { ... }

         laptop: '1024px',
         // => @media (min-width: 1024px) { ... }

         desktop: '1280px'
         // => @media (min-width: 1280px) { ... }
      },
      boxShadow: {
         dialog:
            'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px'
      },
      fontSize: {
         xxs: '0.625rem',
         xs: '0.75rem',
         sm: '0.875rem',
         md: '1rem',
         base: '1rem',
         lg: '1.125rem',
         xl: '1.25rem',
         '1xl': '1.375rem',
         '2xl': '1.5rem',
         '3xl': '1.875rem',
         '4xl': '2.25rem',
         '5xl': '3rem',
         '6xl': '4rem',
         '7xl': '5rem',
         '8xl': '6rem',
         '9xl': '8rem'
      },
      fontWeight: {
         light: 300,
         regular: 400,
         semibold: 600,
         medium: 500,
         bold: 700
      },
      borderRadius: {
         xs: '4px',
         sm: '6px',
         md: '8px',
         lg: '16px',
         xl: '24px',
         full: '9999px'
      },
      gap: {
         1: '0.25rem',
         2: '0.5rem',
         3: '0.75rem',
         4: '1rem',
         5: '1.25rem',
         6: '1.5rem',
         7: '1.75rem',
         8: '2rem',
         10: '2.5rem',
         12: '3rem',
         16: '4rem',
         20: '5rem',
         40: '10rem',
         64: '16rem',
         80: '20rem'
      },
      screens: {
         mobile: { max: '375px' },
         tablet: { max: '640px' },
         laptop: { max: '1024px' },
         desktop: { max: '1280px' }
      },
      colors: {
         primary: {
            main: '#70468C',
            hover: '#4E1B70'
         },
         secundary: {
            main: '#F2AEB4',
            hover: '#F4E8FF'
         },
         secundary_blue: {
            main: '#0C1934'
         },
         secundary_purple: {
            main: '#4D308C',
            hover: '#644E94',
            alternative: '#9486B2'
         },
         terciary: {
            main: '#4065A9'
         },
         neutral: {
            white: '#F4F4F4',
            gray: '#5F5F5F',
            stroke_light: '#DFDFEB',
            light_gray: '#A9A9A9',
            black: '#222222'
         },
         status: {
            green: '#53AA22',
            green_bg: '#ECF8E5',
            pending: '#FA9963',
            pending_bg: '#FFF5DC',
            error: '#FF0D0D',
            disable_text: '#7E7E7E',
            disable_bg: '#C2C2C2',
            pink_bg: '#F7ECFF'
         },
         background: {
            white: '#F2F3F9'
         },
         gradients: {
            primary: 'linear-gradient(45deg, #F3ADB5 0%, #70478D 100%)',
            secunday: 'linear-gradient(45deg, #BF81AA 0%, #70478D 100%)',
            terciary: 'linear-gradient(45deg, #4D308C 0.01%, #70478D 100%)',
            blue: 'linear-gradient(338.76deg, #231269 1.24%, #20509A 99.44%)',
            aquarela:
               'linear-gradient(108deg, #E2E6FF 0%, #DCE8FF 37.72%, #EBDEFF 68.82%, #FFE5E5 97.88%)'
         }
      },
      extend: {
         keyframes: {
            'accordion-down': {
               from: { height: '0' },
               to: { height: 'var(--radix-accordion-content-height)' }
            },
            'accordion-up': {
               from: { height: 'var(--radix-accordion-content-height)' },
               to: { height: '0' }
            }
         },
         animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out'
         }
      }
   },
   plugins: [require('tailwindcss-animate')]
}
export default config
