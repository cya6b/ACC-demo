import Model from './Model'
import ModelSet from './ModelSet'
import Review from './Review';
import ReviewResult from "./ReviewResult";
import Compliance from './Compliance';
import Uploader from '/@/components/service/Upload';
import AddOpinion from './AddOpinion'
import OpinionList from './OpinionList'

import FilesDirectory from './FilesDirectory';
import DiffPdf from './DiffPdf';
const gdaJsSDK = {
  Model, // 单文件展示视图
  ModelSet, // 多文件叠加视图
  Review, // 二三维联审视图(图模大小窗)
  Compliance, // 相符性审查视图(关联叠图)
  ReviewResult, // 设计质量审查结果
  Uploader,
  FilesDirectory, // 目录，文件管理
  AddOpinion, // 添加意见
  OpinionList, // 意见列表
  DiffPdf // pdf对比
}

export default gdaJsSDK;