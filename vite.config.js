import path, { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import alias from '@rollup/plugin-alias'
import commonjs from "rollup-plugin-commonjs";
import externalGlobals from "rollup-plugin-external-globals"

import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'

import VitePluginElementPlus from 'vite-plugin-element-plus/dist'

import postcssAddCssPrefix from './postcss-add-prefix'
const proxyDev = {
  fileApiHost: 'http://gaea-dev.tushen.glodon.com',
  suggestionApiHost: 'http://gaea-dev.tushen.glodon.com/api/e-delivery-suggestion'
}
const proxyTest = {
  fileApiHost: 'http://ptzc.tushenyun.com',
  suggestionApiHost: 'http://gaea-dev.tushen.glodon.com/api/e-delivery-suggestion'
}
let proxy = proxyTest
// 全局对象
let globals = externalGlobals({
  // vue: "Vue",
  // vuex: "Vuex",
  // vueRouter: "VueRouter",
  // "element-plus": "element"
})
// const plugins = process.env.NODE_ENV === 'production' ? [] : [commonjs(), globals]

// https://vitejs.dev/config/
const version = '1.2.0'
const SDK_BUILD = { // sdk打包
  emptyOutDir: true,
  css: {
    postcss: {
      plugins: [
        postcssAddCssPrefix({
          prefix: '.__gda_sdk'
        })
      ]
    }
  },
  lib: {
    // Could also be a dictionary or array of multiple entry points
    entry: resolve(__dirname, 'lib/index.js'),
    name: 'gdaJsSDK',
    // the proper extensions will be added
    fileName: `gda-js-sdk_${version}/[name]`,
  },
  rollupOptions: {
    // 确保外部化处理那些你不想打包进库的依赖
    // external: ['vue'],
    plugins: [
      commonjs(),
      globals,
      // VitePluginElementPlus({
      //   // 如果你需要使用 [component name].scss 源文件，你需要把下面的注释取消掉。
      //   // 对于所有的 API 你可以参考 https://github.com/element-plus/vite-plugin-element-plus
      //   // 的文档注释
      //   // useSource: true
      //   format: mode === 'development' ? 'esm' : 'cjs',
      // }),
    ],
    output: {
      // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      globals: {
        vue: 'Vue3',
        "element-plus": 'elementPlus'
      },
      assetFileNames: `gda-js-sdk_${version}/[name].[ext]`,
    },
  },
}

export default defineConfig(({mode}) => {
  return {
    define: {
      'process.env': process.env
    },
    plugins: [
      alias(),
      vue(),
      VitePluginElementPlus({
        // 如果你需要使用 [component name].scss 源文件，你需要把下面的注释取消掉。
        // 对于所有的 API 你可以参考 https://github.com/element-plus/vite-plugin-element-plus
        // 的文档注释
        // useSource: true
        format: mode === 'development' ? 'esm' : 'cjs',
      }),
      // AutoImport({
      //   resolvers: [
      //     ElementPlusResolver({
      //       importStyle: 'sass',
      //     }),
      //   ],
      // }),
      // Components({
      //   // allow auto load markdown components under `./src/components/`
      //   extensions: ['vue', 'md', 'js'],
      //   // allow auto import and register components used in markdown
      //   include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      //   resolvers: [
      //     ElementPlusResolver({
      //       importStyle: 'sass',
      //     }),
      //   ],
      //   dts: 'src/components.d.ts',
      // }),
    ],
    resolve: {
      alias: {
        "/@": path.resolve(__dirname, "./src"),
      }
    },
    // css: {
    //   postcss: {
    //     plugins: [
    //       postcssAddCssPrefix({
    //         prefix: '.__gda_sdk'
    //       })
    //     ]
    //   }
    // },
    // build: SDK_BUILD,
    base: './',
    server: {
      port: 81,
      proxy: {
        '/api/file': {
          target: proxy.fileApiHost,
          changeOrigin: true,
        },
        '/suggestion': {
          target: proxy.suggestionApiHost,
          changeOrigin: true,
        },
        '/dispatcher': {
          target: 'http://10.2.32.23:8320',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dispatcher/, ""),
        },
      }
    }
  }
})
