import ModelApiRefer from "./ModelApiRefer"
import ModelSetApiRefer from "./ModelSetApiRefer"
import ReviewApiRefer from "./ReviewApiRefer"
import ComplianceApiRefer from "./ComplianceApiRefer"
import ReviewResultApiRefer from './ReviewResultApiRefer'
import FilesDirectoryApiRefer from "./FilesDirectoryApiRefer"
import OpinionAddApiRefer from "./OpinionAddApiRefer"
import OpinionListApiRefer from "./OpinionListApiRefer"
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
    data: ComplianceApiRefer
  }, {
    label: 'ReviewResult',
    data: ReviewResultApiRefer,
    update: true
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
  }
]