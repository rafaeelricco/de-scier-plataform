const config = {
   content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
   theme: {
      container: {
         center: true,
         padding: '2rem',
         screens: {}
      },
      screens: {
         mobile: { max: '375px' },
         tablet: { max: '640px' },
         laptop: { max: '1024px' },
         desktop: { max: '1280px' }
      },
      fontSize: {
         xxs: '0.625rem',
         xs: '0.75rem',
         sm: '0.875rem',
         md: '1rem',
         lg: '1.125rem',
         xl: '1.25rem',
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
            main: '#14CB6B',
            pastel: '#20E37C',
            alternative: '#009245',
            hover: '#20E37C'
         },
         white: {
            main: '#FFFFFF',
            hover: '#EDEEF4'
         },
         black: {
            primary: '#141318',
            secondary: '#313036',
            hover: '#3E3C47'
         },
         background: {
            primary: '#F6F6F6',
            secondary: '#313036',
            black: '#141318',
            header: '#2f2f2f',
            white_hover: '#edeef4'
         },
         tags: {
            yellow: '#FFE092',
            orange: '#FF8743',
            blue: '#007BC0',
            lime: '#B8F587',
            purple: '#9C7EF1',
            grey: '#A4A4A4',
            sea_blue: '#75F1E2'
         },
         status: {
            red: '#EC0000',
            red_hover: '#CB1414',
            green: '#099817',
            blue: '#2D29F8',
            gray: '#A4A4A4',
            pending: '#EC9C00',
            purple: '#9C7EF1',
            yellow: '#FFE092'
         },
         gray: {
            dark: '#C8C8C8',
            stroke: '#DBDBDB',
            light: '#C5C5C5',
            black: '#555555',
            header: '#4d4d4d',
            main: '#6A6A6A',
            skeleton: '#D9D9D9',
            dark_variant: '#989898'
         },
         gradients: {
            primary: 'linear-gradient(90.09deg, #06A429 0%, #4BB061 100%)'
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
