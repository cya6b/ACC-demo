import { createApp } from "vue";
import ReviewComponent from "../src/components/view/aiRes/ReviewResult.vue"
import "../src/style.less"
import '../style/font/iconfont.less'

import tabTypeEnums from '../src/components/view/aiRes/model/tabTypeEnums'
class ReviewResult {
  constructor (options) {
    if (options === void 0) {
      options = {
        el: "#app",
        sourceData: {
          viewer: null,
          status: "",
          tabs: [],
        }
      }
    }
    this.options = options
    this.rootE = null
  }

  // 加载审查结果
  load(el, callback) {
    const _this = this
    load_render.call(_this)

    function load_render () {
      let _el = el || this.options.el
      if (!_el) {
        return
      }
      const rootE = createApp(ReviewComponent, this.options)
      if (_el) {
        _this.rootE = rootE.mount(_el);
      }
    }
  }

  resetData (data) {
    this.rootE.resetData && this.rootE.resetData(data)
  }

  clearAnnorsAndAnnots () {
    this.rootE.clearAnnorsAndAnnots && this.rootE.clearAnnorsAndAnnots()
  }

  setAdoptClickListener (listener) {
    this.rootE.setAdoptClickListener && this.rootE.setAdoptClickListener(listener)
  }

  static formatCompareResultData(data) {
    let ret = []
    function getNums (l, statusCode) {
      let count = 0
      l.conformanceElementResultList.forEach(e => {
        if (e.elementState == statusCode) {
          count++
        }
      })
      return count
    }
    function getErrorElementsNum (l) {
      return getNums(l, '0')
    }
    function getPassElementsNum (l) {
      return getNums(l, '1')
    }
    function f (list) {
      return list.map(l => {
        const errorElementsNum = getErrorElementsNum(l)
        const passElementsNum = getPassElementsNum(l)
        return {
          ...l,
          status: (l.status || l.checkPointState) + '',
          name: l.checkPointTitle, // 名称
          opinionText: l.feedback, // 内容
          count: l.modelElementCount, // 数量
          strong: l.strong, // 是否强条
          drawingId: l.drawingId, // 图纸id
          modelId: l.modelId, // 模型id
          passCount: passElementsNum, // 符合数
          errCount: errorElementsNum, // 不符合数
          elementResults: (l.conformanceElementResultList || []).map(cE => {
            return {
              ...cE,
              drawingId: cE.drawingId, // 图纸id
              modelId: cE.modelId, // 模型id
              componentId: cE.elementId, // 构件id
              componentName: cE.name, // 构件名称              
              viewEleBox: cE.viewEleBox ? JSON.parse(cE.viewEleBox) : null, // 构件包围盒信息
              drawingEleBox: cE.drawingEleBox ? JSON.parse(cE.drawingEleBox) : null,
              message: cE.message, // 意见内容
              elementState: cE.elementState,
              status: cE.elementState + '',
              views: cE.views,
              bimFileId: cE.bimFileId
            }
          })
        }
      })
    }
    if (Array.isArray(data)) {
      const tabTypesMap = tabTypeEnums.compare_enums
      tabTypesMap.forEach(tS => {
        let tL = data.filter(d => d.checkPointState === tS.status)
        ret.push({
          tabName: tS.tabName, // tab页名称
          tabType: tS.tabType,
          count: tL.length,  // 该tab 名称后跟的数量信息
          list: f(tL)
        })
      })
    }
    return ret
  }

  static formatReviewResultData(data) {
    let ret = []
    function getNums (l, statusCode) {
      let count = 0
      l.checkPointResults.forEach(lC => {
        lC.elementResults.forEach(e => {
          if (e.elementState == statusCode) {
            count++
          }
        })
      })
      return count
    }
    function getErrorElementsNum (l) {
      return getNums(l, '0')
    }
    function getDoubtElementsNum (l) {
      return getNums(l, '-1')
    }
    function getPassElementsNum (l) {
      return getNums(l, '1')
    }
    function f (list) {
      return list.map(l => {
        const errorElementsNum = getErrorElementsNum(l)
        const doubtElementNum = getDoubtElementsNum(l)
        const passElementsNum = getPassElementsNum(l)
        return {
          ...l,
          status: l.status + '',
          name: `${l.specificationContent} ${l.articleCode}`, // 名称
          articleContent: l.articleContent,
          opinionText: l.articleConclusion, // 内容
          checkPointCount: l.checkPointNum, // 审查点个数
          passCount: passElementsNum, // 通过数
          errCount: errorElementsNum, // 问题数量
          doubtCount: doubtElementNum, // 存疑数
          elementNum: l.elementNum,
          strong: l.strong == 'true' || l.strong == true, // 是否强条
          adoption: l.adoption,
          detail: l.checkPointResults.map(c => {
            return {
              ...c,
              drawingId: "", // 图纸id
              modelId: "", // 模型id

              status: c.status + '',
              message: c.checkPointConclusion, // 意见内容
              content: c.checkPointContent, // 审查点内容
              elementResults: c.elementResults.map(cE => {
                return {
                  ...cE,
                  result: cE.elementResult, // 信息
                  componentId: cE.elementId, // 构件id
                  componentName: cE.name, // 构件名称              
                  viewEleBox: null,
                  elementState: cE.elementState,
                  status: cE.elementState + '',
                  views: cE.views,
                  bimFileId: cE.bimFileId
                }
              })
            }
          })
        }
      })
    }
    if (Array.isArray(data)) {
      const tabTypesMap = tabTypeEnums.review_enums
      tabTypesMap.forEach(tS => {
        let tL = data.filter(d => d.status === tS.status)
        ret.push({
          status: tS.status + '',
          tabName: tS.tabName, // tab页名称
          tabType: tS.tabType,
          count: tL.length,  // 该tab 名称后跟的数量信息
          list: f(tL)
        })
      })
    }
    return ret
  }
}
export default ReviewResult