import DrawingAndModelJointReviewSceneTemplate from './DrawingAndModelJointReviewSceneTemplate'
import SingleDrawingReviewSceneTemplate from './SingleDrawingReviewSceneTemplate'
import SingleModelReviewSceneTemplate from './SingleModelReviewSceneTemplate'
import ComplianceReviewSceneTemplate from './ComplianceReviewSceneTemplate'
import AssociationDrawingWithViewSceneTemplate from './AssociationDrawingWithViewSceneTemplate'

import FileDirectoryTemplate from './FileDirectorySceneTemplate'

import PdfDiffTemplate from './pdfDiffTemplate'
export default {
  1: {
    source: {
      containerId: 774371171934208,
      sourceFileId: ['776903850909696']
    },
    template: SingleDrawingReviewSceneTemplate,
  },
  2: {
    source: {
      containerId: 774371171934208,
      sourceFileId: ['776965950664704']
    },
    template: SingleModelReviewSceneTemplate,
  },
  3: {
    source: {
      containerId: 774371171934208,
      sourceFileId: ['776965950664704', '776903850909696', '776903851970560', '776903853019136', '776903853940736', '776903855128576']
    },
    template: DrawingAndModelJointReviewSceneTemplate,
  },
  4: {
    source: {
      containerId: 774371171934208,
      sourceFileId: ['776965950664704', '776903850909696']
    },
    template: ComplianceReviewSceneTemplate,
  },
  5: {
    source: {
      containerId: 774371171934208,
      sourceFileId: ['776965950664704', '776903850909696', '776903851970560', '776903853019136', '776903853940736']
    },
    template: AssociationDrawingWithViewSceneTemplate,
  },
  7: {
    source: {
      containerId: 774371171934208,
      sourceFileId: []
    },
    template: FileDirectoryTemplate,
  },
  8: {
    template: PdfDiffTemplate
  }
}