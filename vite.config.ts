import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  const server = {
    proxy: {
      '/api': {
        target: 'https://deployedurl.com',
        changeOrigin: true,
      },
    },
    port: 3000,
  };

  if (mode === 'noproxy') {
    server.proxy['/api'].target = 'http://127.0.0.1:9000';
  }
  return {
    optimizeDeps: {
      exclude: ['js-big-decimal'],
    },
    plugins: [react()],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    server,
    base: env.VITE_BASE_URL || '/',
  };
});
