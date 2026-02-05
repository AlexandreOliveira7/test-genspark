import Vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import Fonts from "unplugin-fonts/vite";
// Plugins
import Components from "unplugin-vue-components/vite";

// Utilities
import { defineConfig } from "vite";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    // Vuetify loader
    Vuetify({
      autoImport: true,
      styles: {
        configFile: "src/styles/settings.scss",
      },
    }),
    // Components auto import
    Components({
      dts: "src/components.d.ts",
    }),
    // Fonts
    Fonts({
      fontsource: {
        families: [
          {
            name: "Roboto",
            weights: [100, 300, 400, 500, 700, 900],
            styles: ["normal", "italic"],
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: [
      "vuetify",
      "vue-router",
      // ❌ remove todas as entradas do unplugin-vue-router
    ],
  },
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      sass: {
        api: "modern-compiler",
      },
      scss: {
        api: "modern-compiler",
      },
    },
  },
});
