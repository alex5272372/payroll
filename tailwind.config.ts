import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './lib/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx}',
  ],
  // Force single light mode (disable dark variants)
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
        },
      },
    },
  },
  plugins: [],
}

export default config
