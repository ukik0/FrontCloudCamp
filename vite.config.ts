import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import * as path from 'path';

export default defineConfig({
    plugins: [react(), svgr({ include: '**/*.svg' })],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
    }
});
