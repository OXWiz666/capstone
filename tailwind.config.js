import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

module.exports = {
    purge: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.vue',
        
    ],

    theme: {
        extend: {
          colors: {
            slate: {
              950: '#0f172a',
            },
          },
        },
      },
      
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        tailwindcss()
    ],
}
export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
  })