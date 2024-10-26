import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

const { publicVars } = loadEnv({ prefixes: ['PUBLIC_'] });
export default defineConfig({
  plugins: [pluginReact()],
  source: {
    define: publicVars,
  },
  html: {
    title: 'React Admin',
    favicon: './static/favicon-32x32.png'
  }
});
