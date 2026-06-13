/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Chrome / core palette — keep tight
        bone: '#F2EEE6',      // cream/bone ground (default surface)
        ink: '#1C1B19',       // near-black type
        oxblood: '#7A2E28',   // accent — surgical use only
        caption: '#B8B2A6',   // caption gray
        // Swatch-tile-only palette (color blocks, never chrome)
        olive: '#A8B14A',
        skyblue: '#B7C5CC',
      },
      fontFamily: {
        display: ['Archivo', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        label: '0.22em',
      },
      maxWidth: {
        editorial: '1180px',
      },
    },
  },
  plugins: [],
}
