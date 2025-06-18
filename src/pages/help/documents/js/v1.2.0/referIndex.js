import ModelApiRefer from "./ModelApiRefer"
import ModelSetApiRefer from "./ModelSetApiRefer"
import ReviewApiRefer from "./ReviewApiRefer"
import ComplianceApiRefer from "./ComplianceApiRefer"
import ReviewResultApiRefer from './ReviewResultApiRefer'
import FilesDirectoryApiRefer from "./FilesDirectoryApiRefer"
import OpinionAddApiRefer from "./OpinionAddApiRefer"
import OpinionListApiRefer from "./OpinionListApiRefer"
import UploaderApiRefer from "./UploaderApiRefer"
import DiffPdfRefer from './DiffPdfRefer'
export default [
  {
    label: 'Model',
    data: ModelApiRefer,
    update: true
  }, {
    label: 'ModelSet',
    data: ModelSetApiRefer
  }, {
    label: 'Review',
    data: ReviewApiRefer,
    update: true
  }, {
    label: 'Compliance',
    data: ComplianceApiRefer,
    update: true
  }, {
    label: 'ReviewResult',
    data: ReviewResultApiRefer,
  }, {
    label: 'FilesDirectory',
    data: FilesDirectoryApiRefer
  }, {
    label: 'AddOpinion',
    data: OpinionAddApiRefer,
  }, {
    label: 'OpinionList',
    data: OpinionListApiRefer,
  }, {
    label: 'Uploader',
    data: UploaderApiRefer
  }, {
    label: 'DiffPdf',
    data: DiffPdfRefer,
    new: true,
  }
]