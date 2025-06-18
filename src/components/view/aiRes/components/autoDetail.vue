<template>
  <div class="auto-detail scroll-bar" v-loading="loading">
    <!-- <span class="title" @click="back">
      <i class="gda_sdk_iconfont icon-fanhui"></i>
      <span>意见详情</span>
    </span> -->
    <template v-if="!loading">
      <div class="comment-title">
        <ElPopover placement="left"
          effect="dark"
          width="320"
          popper-class="auto-detail-tooltip">
          <template #reference>
            <div>
              <span v-if="autoDetail.strong" class="strong-badge">强条</span>
              <span>{{ sliceSpecTitle(autoDetail) }}</span>
            </div>
          </template>
          <div class="title">
            <span v-if="autoDetail.strong" class="strong-badge">强条</span>
            <span>{{ sliceSpecTitle(autoDetail) }}</span>
          </div>
          <div v-html="autoDetail.articleContent"></div>
        </ElPopover>
      </div>
      <template v-if="showOpinionContentAndAdoptBtn(autoDetail)">
        <div class="comment-conclusion">
          <div class="conclusion-title">
            审查意见
            <i
              v-if="autoDetail.adoption"
              class="gda_sdk_iconfont icon-cainayinzhang"
            ></i>
          </div>
          <div class="conclusion-info">{{ autoDetail.opinionText }}</div>
        </div>
        <div class="comment-btns">
          <el-button
            v-if="showAdopt && !autoDetail.adoption"
            type="primary"
            @click="handleAcceptComment(autoDetail)"
          ><i class="gda_sdk_iconfont icon-duigou"></i>采纳
          </el-button>
        </div>
      </template>
      <div class="comment-point">
        <span>审查点数&nbsp;{{ autoDetail.checkPointCount }}个</span>
        <!-- 通过类的 -->
        <span v-if="autoDetail.status == '1'">正常数&nbsp;
          <a style="color:#4de96a">{{ autoDetail.passCount }}个</a>&nbsp;
        </span>
        <!-- 未审查类 -->
        <span v-else-if="comment.status == '2'">未审查</span>
        <!-- 存疑类 -->
        <span v-else-if="autoDetail.status == '-1' && autoDetail.doubtCount">
          存疑数&nbsp;
          <a style="color: #F8830B">{{ autoDetail.doubtCount }}个</a>&nbsp;
        </span>
        <!-- 非通过类的 -->
        <span v-else-if="autoDetail.errCount">
          问题数&nbsp;
          <a style="color:#E94D4D">{{ autoDetail.errCount }}个</a>&nbsp;
        </span>
      </div>

      <!-- 审查点列表 -->
      <div class="check-point-results" v-if="autoDetail.detail && autoDetail.detail.length">
        <div v-for="(errorItem, errorItemIndex) in autoDetail.detail" class="check-point-result-item" :key="errorItem.id">
          <div>
            <span>审查点{{ errorItemIndex + 1 }}</span>
            <div :class="getStatusByCode(errorItem.status).className">
              {{ getStatusByCode(errorItem.status).name }}
            </div>
          </div>
          <div v-if="autoDetail.status == '-1' || comment.status == '2'" class="conclusion">
            {{ errorItem.content }}
          </div>
          <div class="conclusion">
            {{ errorItem.message }}
          </div>
          <div class="count-div" :class="getStatusByCode(errorItem.status).code === '1' ? 'on_top' : ''">
            <!-- <span>{{ getStatusByCode(errorItem.status).des }}</span>
            <span class="count">{{ (errorItem.elementResults || []).length }}</span>
            <i class="gda_sdk_iconfont"
                :class="errorItemIndex === activeErrorItemIndex ? 'icon-icon_xianshikai show-anchors' : 'icon-icon_xianshiguan'"
                @click="eyeClick(errorItem, errorItemIndex)"></i> -->

            <span class="count_span_item" v-for="(eM, eMIndex) in elementResultsMaps(errorItem.elementResults)">
              <span>{{ eM.des }}</span>
              <span :class="`count ${eM.typeCode}`">{{ (eM.list || []).length }}</span>
              <i class="gda_sdk_iconfont"
                  :class="(errorItemIndex === activeErrorItemIndex && eMIndex === activeElementMapItemIndex) ? 'icon-icon_xianshikai show-anchors' : 'icon-icon_xianshiguan'"
                  @click="eyeClick(errorItem, errorItemIndex, eMIndex)"></i>
            </span>
          </div>

          <!-- 问题列表 -->
          <div class="element-results" v-if="errorItemIndex === activeErrorItemIndex">
            <div v-for="(elementResult, index) in getElementsByType(errorItem.elementResults, elementResultsMaps(errorItem.elementResults)[activeElementMapItemIndex].status)" :key="elementResult.id"
                  @click="errorEleBoxClick(index)"
                  class="element-result-item" :class="{'active': activeElementIndex === index}">
              <div>
                {{ index + 1 }}、{{ elementResult.componentName }}（ID：{{ elementResult.componentId }}）
              </div>
              <div>
                {{ elementResult.result }}
              </div>
            </div>
          </div>

        </div>
        <div></div>
      </div>
    </template>
  </div>
</template>
<script>
/* Copyright (C) <1998-2024> Glodon Company Limited
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const elementResStatusMap = [
  {
    status: '0',
    des: '问题数',
    typeCode: 'not-pass',
  },
  {
    status: '-1',
    des: '存疑数',
    typeCode: 'doubt',
  },
  {
    status: '1',
    des: '正常数',
    typeCode: 'pass'
  },
]
const statusMap = {
  '0': {
    code: '0',
    name: '未通过',
    className: 'label not-pass-label',
  },
  '-1': {
    code: '-1',
    name: '存疑',
    className: 'label doubt-label',
  },
  '1': {
    code: '1',
    name: '通过',
    className: 'label pass-label',
  },
  '2': {
    code: '2',
    name: '未审查',
    className: 'label unexamined-label',
  }
}
import {ElButton, ElPopover} from "element-plus"
export default {
  name: 'autoDetail',
  components: {ElButton, ElPopover},
  inject: ["Markups"],
  data () {
    return {
      autoDetail: {},
      type: '',
      loading: false,
      dataEmpty: true,
      isError: false,
      scroll: {
        loading: false,
        empty: false,
        isError: false
      },
      pageSize: 10,
      pageNum: 0,
      flag: false,
      list: [],
      activeErrorItemIndex: null, // 当前展开的审查点
      activeElementMapItemIndex: null, // 当前展开的审查点下结果构件类型
      activeElementIndex: null, // 当前选中的构件
    }
  },
  props: {
    comment: {
      type: Object,
      default: {}
    },
    acceptCommentHandle: {
      type: Function
    },
    showAdopt: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    showOpinionContentAndAdoptBtn () {
      return val => {
        return val.status == '-1' || val.status == '0'
      }
    },
    getStatusByCode () {
      return statusCode => {
        return statusMap[statusCode] || statusMap[0]
      }
    },
    elementResultsMaps () {
      return list => {
        let ret = []
        elementResStatusMap.map(eM => {
          let tempArr = list.filter(l => {
            return l.status == eM.status
          })
          if (tempArr.length) {
            ret.push({
              ...eM,
              list: tempArr
            })
          }
        })
        return ret
      }
    }
  },
  watch: {
    comment: {
      handler (val) {
        this.autoDetail = val
      },
      immediate: true
    },
    activeElementIndex (val) {
      this.Markups.activeIndex = val
    }
  },
  methods: {
    getElementsByType (eleList, typeStatus) {
      return eleList.filter(e => {
        return e.status == typeStatus
      })
    },
    setActiveAnnorIndex (index) {
      this.activeElementIndex = index
    },
    eyeClick (errItem, index, index2) {
      if (this.activeErrorItemIndex === index && this.activeElementMapItemIndex === index2) {
        this.activeErrorItemIndex = null
        this.activeElementMapItemIndex = null
      } else {
        this.activeErrorItemIndex = index
        this.activeElementMapItemIndex = index2
      }

      // 清除选中的构件
      this.activeElementIndex = null

      // 组织批注绘制数据
      let tempL = []
      if (this.activeErrorItemIndex !== null) {
        let rts = this.getElementsByType(errItem.elementResults,
        this.elementResultsMaps(errItem.elementResults)[this.activeElementMapItemIndex].status)
        rts.forEach(e => {
          tempL.push({
            componentId: e.componentId,
            componentName: e.componentName,
            box: e.viewEleBox,
            content: e.result,
            views: e.views,
            bimFileId: e.bimFileId,
            pathPoints: e.pathPoints || '[]'
          })
        })
      }
      this.Markups.list = tempL
    },
    errorEleBoxClick (index) {
      if (this.activeElementIndex === index) {
        this.activeElementIndex = null
      } else {
        this.activeElementIndex = index
      }
    },
    clearAnnorAndAnnots () {
      // 清除当前详情中展示的批注和锚点信息
      this.Markups.list = []
      this.Markups.activeIndex = null
    },
    back () {
      this.$emit("goBackHandle")

      // 清空标注，关闭眼睛状态
      this.clearAnnorAndAnnots()
      this.activeErrorItemIndex = null
      this.activeElementMapItemIndex = null
    },
    sliceSpecTitle (comment) {
      const title = comment.name || ''
      let arr = title.split('')
      let max = 59
      if (comment.strong) {
        max = 62
      }
      if (arr.length > max) {
        return arr.splice(0, max).join('') + '...'
      } else {
        return title
      }
    },

    handleAcceptComment (d) {
      this.waittingAcceptComment = d
      this.acceptCommentHandle && this.acceptCommentHandle(d, this.acceptSuccessHandle)
    },
    acceptSuccessHandle () {
      this.waittingAcceptComment.adoption = true
    }
  },
  beforeDestroy () {
    this.drawingAnchors(null, this.autoDetail.drawingType)
  }
}
</script>
<style lang="less" scoped>
@import "./assets/common.less";

.loadingfaildCommon {
  text-align: center;
  .font-normal();
  color: #d1d1d1;

  .btn {
    text-decoration: underline;
    text-underline-offset: 2px;
    cursor: pointer;

    &:hover {
      .font-hover();
    }
  }
}

.auto-detail {
  margin: 12px auto 0;
  font-size: 14px;
  color: #f2f2f8;
  position: relative;
  .title{
    width: calc(100% - 48px);
    padding-top: 14px;
    padding-bottom: 14px;
    margin: 0 auto;
    font-weight: 500;
    font-size: 14px;
    color: #f2f2f8;
    display: -ms-flexbox;
    display: flex;
    border-bottom: 1px solid #545664;
    margin-bottom: 12px;
    &:hover {
      cursor: pointer;
      // color: #126bff;
    }
    .span_txt{
      line-height: 24px;
    }
  }

  :deep(.el-loading-mask) {
    background: #282a34;

    .el-loading-spinner {
      margin-top: -40px;
      top: 30%;

      .circular {
        height: 80px;
        width: 80px;
      }

      .path {
        stroke-width: 1.5;
        stroke: #126bff;
      }
    }
  }

  .comment-title {
    width: @commentPanelWidth;
    margin: 0 auto;
    font-size: 14px;
    font-weight: 500;
    word-break: break-all;

    .strong-badge {
      display: inline-block;
      background: #40424c;
      border: 1px solid #f2f2f8;
      border-radius: 2px;
      font-size: 12px;
      padding: 0 6px;
    }

    .detail-btn {
      float: right;
      cursor: pointer;
    }
  }

  .comment-conclusion {
    width: @commentPanelWidth;
    margin: 6px auto 0 auto;
    border: 1px solid #545664;
    border-radius: 2px;

    .conclusion-title {
      font-size: 12px;
      padding-left: 8px;
      padding-top: 4px;
      padding-bottom: 4px;
      border-bottom: 1px solid #545664;

      .icon-cainayinzhang {
        font-size: 60px;
        position: absolute;
        top: -4px;
        right: 42px;
        color: #4FC403;
      }
    }

    .conclusion-info {
      padding: 8px;
    }
  }

  .comment-btns {
    width: @commentPanelWidth;
    text-align: right;
    margin: 6px auto 12px auto;

    position: relative;

    .el-button {
      width: 60px;
      height: 24px;
      line-height: 20px;
      background-color: #126bff;
      color: #f2f2f8;
      border-color: #126bff;
    }
  }

  .comment-point {
    width: @commentPanelWidth;
    margin: 6px auto 12px auto;
    font-size: 14px;

    span {
      display: inline-block;
      min-width: 96px;
    }

    .gda_sdk_iconfont {
      cursor: pointer;
    }

    .show-anchors {
      color: rgba(18, 107, 255, 1);
    }
  }

  .comment-list--empty {
    padding-top: 152px;
    font-size: 0px;
    text-align: center;

    div {
      text-align: center;
      .font-normal();
      color: #d1d1d1;
    }

    img {
      width: 120px;
      height: 120px;
    }
  }

  .comment-list--failed {
    text-align: center;
    padding-top: 152px;
    .loadingfaildCommon();
  }

  .check-point-results {
    width: @commentPanelWidth;
    margin: 0 auto;

    .check-point-result-item {
      position: relative;
      background: #363842;
      padding: 12px;
      border: 1px solid #545664;

      &:hover {
        border: 1px solid #126bff;
      }
      &:not(:last-child) {
        margin-bottom: 12px;
      }

      .label {
        width: 48px;
        height: 20px;
        border-radius: 2px;
        font-size: 12px;
        display: inline-block;
        text-align: center;
        line-height: 20px;
        margin-left: 6px;
      }

      .not-pass-label {
        color: rgba(255, 81, 81, 1);
        background-color: rgba(255, 81, 81, .2);
      }

      .pass-label{
        color: rgba(79, 196, 3, 1);
        background-color: rgba(79, 196, 3, .2);
      }

      .unexamined-label{
        color: rgba(201, 205, 212, 1);
        background-color: rgba(201, 205, 212, .2);
      }

      .doubt-label {
        color: rgba(248, 131, 11, 1);
        background-color: rgba(248, 131, 11, .2);
      }

      .icon-fankuiwupan {
        float: right;
      }

      .conclusion {
        line-height: 20px;
      }

      .count-div {
        text-align: right;

        .gda_sdk_iconfont {
          cursor: pointer;
        }

        .show-anchors {
          color: rgba(18, 107, 255, 1);
        }
        
        .count_span_item{
          margin-left: 6px;

          span,i{
            margin-left: 2px;
          }
          .count {
            color: rgba(233, 77, 77, 1);
          }
          .count.doubt{
            color: rgba(248, 131, 11, 1);
          }
          .count.not-pass{
            color: rgba(255, 81, 81, 1);
          }
          .count.pass{
            color: rgba(79, 196, 3, 1);
          }

          i{
            cursor: pointer;
            &:hover{
              color: rgba(18, 107, 255, .8);
            }
          }
        }
      }

      .count-div.on_top{
        position: absolute;
        right: 12px;
        top: 9px;
      }

      .element-results {
        margin-top: 6px;

        .element-result-item {
          padding: 12px;
          background-color: #363842;
          border: 1px solid #545664;
          box-sizing: border-box;
          border-radius: 2px;

          &:hover {
            border: 1px solid #126bff;
          }
          &:not(:last-child) {
            margin-bottom: 6px;
          }

          &.active {
            background-color: rgba(18, 107, 255, 0.3);
          }
        }
      }
    }
  }

  .list-scroll {
    height: 60px;
    line-height: 60px;

    .list-scroll--loading {
      height: 100%;

      :deep(.el-loading-mask) {
        background: transparent;

        .el-loading-spinner {
          margin-top: -16px;
          top: 50%;

          .circular {
            height: 32px;
            width: 32px;
          }

          .path {
            stroke-width: 1.5;
            stroke: #126bff;
          }
        }
      }
    }

    .list-scroll--failed {
      .loadingfaildCommon();
      line-height: 60px;
    }

    .list-scroll--empty {
      text-align: center;
      .font-normal();
      color: #d1d1d1;
      line-height: 60px;
    }
  }
}
</style>
