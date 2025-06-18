import ModelApiRefer from "./ModelApiRefer"
import ModelSetApiRefer from "./ModelSetApiRefer"
import ReviewApiRefer from "./ReviewApiRefer"
import ComplianceApiRefer from "./ComplianceApiRefer"
import ReviewResultApiRefer from './ReviewResultApiRefer'
import FilesDirectoryApiRefer from "./FilesDirectoryApiRefer"
import UploaderApiRefer from "./UploaderApiRefer"
export default [
  {
    label: 'Model',
    data: ModelApiRefer
  }, {
    label: 'ModelSet',
    data: ModelSetApiRefer
  }, {
    label: 'Review',
    data: ReviewApiRefer
  }, {
    label: 'Compliance',
    data: ComplianceApiRefer,
  }, {
    label: 'ReviewResult',
    data: ReviewResultApiRefer,
  }, {
    label: 'FilesDirectory',
    data: FilesDirectoryApiRefer
  }, {
    label: 'Uploader',
    data: UploaderApiRefer
  }
]