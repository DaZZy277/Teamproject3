import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // เปลี่ยนจาก 5173 เป็น 3000
    proxy: {
      "/api": {
        target: "http://52.77.219.134:5050",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    hmr: {
      protocol: "ws",
      host: "localhost",
    },
  },
});
