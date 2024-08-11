import tsconfigpaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tsconfigpaths()],
  test: {
    include: ['src/**/*.spec.ts', 'test/**/*.spec.ts'],
    coverage: {
      reporter: ['text', 'html', 'clover', 'json', 'lcov'],
      exclude: [
        'build',
        'src/server.ts',
        'vite.config.ts',
        'src/config/**',
        'src/**/*.spec.ts',
        'test/**/*.spec.ts',
      ],
    },
  },
})
