import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import glsl from "vite-plugin-glsl";

export default defineConfig({
  plugins: [
    react({
      include: "**/*.glsl",
    }),
    glsl({
      watch: true,
    }),
  ],
});
