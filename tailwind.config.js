/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './index.html',
  ],
  safelist: [
    'container',
    'px-8',
    'mx-auto',
    'xl:px-5',
    'max-w-screen-xl',
    'max-w-screen-lg',
    'py-5',
    'lg: py-8',
    'flex',
    'flex-row',
    'flex-col',
    'rounded-md',
    'transition-all',
    'shadow-lg',
    'group',
    'group-hover',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        smooch: ['Smooch Sans', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [require('flowbite/plugin')],
  corePlugins: {
    preflight: false,
  }
}

