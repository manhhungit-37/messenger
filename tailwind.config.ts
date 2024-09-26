import type { Config } from 'tailwindcss';
import formStyles from '@tailwindcss/forms';

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {

      },
    },
  },
  plugins: [
    formStyles({ strategy: 'class' }),
  ],
};
export default config;
