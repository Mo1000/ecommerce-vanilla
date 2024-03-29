import {defineConfig} from "vite";

export default defineConfig({
    resolve: {
        alias: {
            "@": "/src",
        },
    },
    define: {
        'process.env': process.env,
    },
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
                login: './login.html',
                register: './register.html',
            }
        },
        target: 'esnext', //browsers can handle the latest ES features
        outDir: "dist",
    },
});
