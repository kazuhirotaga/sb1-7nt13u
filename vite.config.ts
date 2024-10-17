import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log('Loaded environment variables:', {
    VITE_GITHUB_CLIENT_ID: env.VITE_GITHUB_CLIENT_ID,
    VITE_REDIRECT_URI: env.VITE_REDIRECT_URI,
    VITE_API_URL: env.VITE_API_URL,
  });

  return {
    plugins: [react()],
    define: {
      'process.env.VITE_GITHUB_CLIENT_ID': JSON.stringify(env.VITE_GITHUB_CLIENT_ID),
      'process.env.VITE_REDIRECT_URI': JSON.stringify(env.VITE_REDIRECT_URI),
      'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});