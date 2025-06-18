import { createRouter, createWebHashHistory } from "vue-router";
import indexPage from '../pages/index.vue';
import ScenePage from '../pages/scene/index.vue';
import FileDirectoryDemoPage from '../pages/demo/fileDirectoryDemo.vue';
import ModelAndDrawingLinkDemoPage from '../pages/demo/modelAndDrawingLinkDemo.vue';
import HelpPage from '../pages/help/index.vue';
import DocsPage from '../pages/help/documents/index.vue';
import developerUpdatePage from '../pages/developerUpdates/index.vue'

import PreviewPage from '../pages/preview/index.vue';

import assetPage from "../pages/assetPage.vue";

import testRouter from './testRouter'
import webComponentRouter from "./webComponentRouter";
let routes = [
  {
    path: '/',
    component: indexPage,
    redirect: '/help',
    children: [
      {
        path: 'help',
        component: HelpPage,
      },
      {
        path: '/fileDirectory',
        component: FileDirectoryDemoPage
      },
      {
        path: 'preview',
        component: PreviewPage
      },
      {
        path: 'assets_sdk',
        component: assetPage,
      },
      {
          path:'scene',
          component:ScenePage,
      },
      {
        path: 'docs',
        component: DocsPage
      },
      {
        path: 'developerUpdates',
        component: developerUpdatePage,
      }
    ]
  },
  // 组件web服务页
  ...webComponentRouter,
]
if (import.meta.env.DEV || import.meta.env.PROD) {
  routes = routes.concat(testRouter)
}
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router;