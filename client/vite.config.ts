import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Hoặc plugin khác nếu không phải React

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  
});
