import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Honban Warning",
  description: "本番環境で警告を出す拡張",
  version: "0.0.1",
  permissions: ["storage", "tabs"],
  action: {
    default_popup: "index.html",
  },
  content_scripts: [
    {
      js: ["src/content.tsx"],
      matches: ["<all_urls>"],
    },
  ],
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
});
