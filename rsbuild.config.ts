import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginLess } from "@rsbuild/plugin-less";

const { publicVars } = loadEnv({ prefixes: ["PUBLIC_"] });
export default defineConfig({
  plugins: [pluginReact(), pluginLess()],
  source: {
    define: publicVars,
  },
  html: {
    title: "React Admin",
    favicon: "./static/favicon-32x32.png",
  },
});
