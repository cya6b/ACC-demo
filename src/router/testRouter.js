import AddOpinionTest from '../pages/test/addOpinionTest.vue'
import OpinionListTest from '../pages/test/opinionListTest.vue'
import RootPage from '../pages/index.vue'
import ReviewAndAddOpinionTest from '../pages/test/reviewAndAddOpinionTest.vue'
import ReviewResultTest from '../pages/test/reviewResultTest.vue'
import UploadTest from '../pages/test/UploadTest.vue'
import DrawingLinkTest from '../pages/test/drawingLinkTest.vue'
// import PdfViewTest from '../pages/test/pdfViewTest.vue'
import PdfDiffTest from '../pages/test/pdfDiffTest.vue'
export default [
  {
    path:'/test',
    component: RootPage,
    children: [
      {
        path: 'addOpinion',
        component: AddOpinionTest
      },
      {
        path: 'opinionList',
        component: OpinionListTest
      },
      {
        name: 'reviewAndAddOpinion',
        path: 'reviewAndAddOpinion',
        component: ReviewAndAddOpinionTest
      },
      {
        name: 'reviewResult',
        path: 'reviewResult',
        component: ReviewResultTest
      },
      {
        name: 'upload',
        path: 'upload',
        component: UploadTest
      },
      {
        name: 'drawingLink',
        path: 'drawingLink',
        component: DrawingLinkTest
      },
      // {
      //   name: 'pdfView',
      //   path: 'pdfView',
      //   component: PdfViewTest
      // },
      {
        name: 'pdfDiff',
        path: 'pdfDiff',
        component: PdfDiffTest
      }
    ]
  },
]
