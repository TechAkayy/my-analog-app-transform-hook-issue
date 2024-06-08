/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    {
      enforce: 'pre',
      name: 'kingfisher-to-puppy',
      transform: (code, id, options) => {
        if (id.endsWith('index.page.analog')) {
          code = code.replace(
            'https://images.unsplash.com/photo-1444464666168-49d633b86797',
            'https://images.unsplash.com/photo-1534361960057-19889db9621e'
          );
          return { code };
        }
      },
    },
    analog({
      vite: {
        experimental: {
          supportAnalogFormat: true,
        },
      },
    }),
  ],
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
