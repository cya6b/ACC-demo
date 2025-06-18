import indexPage from '../pages/index.vue'
import reviewResultsReportPage from '../web-components/pages/reviewResultsReport/index.vue'
export default [
  {
    path:'/report',
    component: indexPage,
    children: [
      {
        path: 'view',
        component: reviewResultsReportPage
      },
    ],
    meta: {
      noHeader: true
    }
  },
]
