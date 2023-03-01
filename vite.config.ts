import type { UserConfig, ConfigEnv } from 'vite';

import { resolve } from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';

import vue from '@vitejs/plugin-vue';
function pathResolve(dir: string) {
    return resolve(process.cwd(), '.', dir);
}

export default ({}: ConfigEnv): UserConfig => {
    const root = process.cwd();

    // The boolean type read by loadEnv is a string. This function can be converted to boolean type

    return {
        root,
        resolve: {
            alias: [
                {
                    find: /@\//,
                    replacement: pathResolve('src') + '/',
                },
                {
                    find: /\/#\//,
                    replacement: pathResolve('types') + '/',
                },
            ],
        },

        build: {
            // Turning off brotliSize display can slightly reduce packaging time
            brotliSize: false,
            chunkSizeWarningLimit: 2000,
            target: 'modules',
            minify: true,
            cssCodeSplit: true,
            sourcemap: false,
            outDir: pathResolve('dist'),
            lib: {
                entry: pathResolve('packages/index.ts'),
                name: 'tinymce-vue-plugins',
                fileName: (format) => `index.${format}.js`,
                formats: ['es', 'cjs'],
            },
            rollupOptions: {
                external: ['vue'],
                output: {
                    globals: {
                        vue: 'Vue',
                    },
                },
            },
        },

        // The vite plugin used by the project.

        optimizeDeps: {
            include: ['ant-design-vue/es/locale/zh_CN', 'ant-design-vue/es/locale/en_US'],
            exclude: ['vue-demi'],
        },
        plugins: [
            vue(),
            // 添加JSX插件
            vueJsx({
                // options are passed on to @vue/babel-plugin-jsx
            }),
        ],
    };
};
