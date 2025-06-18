<template>
  <!-- 相符性审查结果 -->
  <div class="comment-list">
    <div v-if="tabs.length" class="comment-category_tab">
      <div
        v-for="(tab, tabIndex) in tabs"
        :key="tabIndex"
        @click="tabClick(tabIndex, tab)"
        class="category-item"
        :class="{ active: activeTabIndex === tabIndex }"
      >
        {{ tab.tabName }} {{ tab.count }}
      </div>
      <autolistSearch class="search" placeholder="请输入“审查点名称”进行查询"
        @inputHandle="(value) => {search = value}"></autolistSearch>
    </div>
    <template v-if="currentDataList(search).length">
      <div class="__scroll scroll-bar">
      <div
        v-for="(comment, commentIndex) in currentDataList(search)"
        class="comment"
        :key="comment.id"
      >
        <div class="comment-title" @click="commentClick(comment, commentIndex)">
          <ElPopover placement="left"
            effect="dark"
            width="320"
            popper-class="auto-detail-tooltip">
            <template #reference>
              <p>
                <i :class="
                `gda_sdk_iconfont icon-down title_r ${commentIndex === activeCommentIndex ? '' : '__rotate_90'}`">
                </i>
                <span class="content">
                  {{ commentIndex + 1 }}.{{comment.name || '审查点标题'}}
                </span>
                <span
                  v-if="comment.adoption && activeCommentIndex !== commentIndex"
                  class="checked gda_sdk_iconfont icon-duigouduigou"
                ></span>
              </p>
            </template>
            <p>
              {{ comment.name || '审查点标题' }}
            </p>
          </ElPopover>
        </div>

        <div class="comment-content" v-show="activeCommentIndex === commentIndex">
          <div class="article-info" v-html="comment.opinionText"></div>
          <div class="comment-func">
            <div class="comment-point">
              <!-- 符合类 -->
              <template v-if="comment.status == 1">
                <span class="count_info_item">
                  <i :class="
                  `gda_sdk_iconfont icon-down title_r ${comment.itemPaneExpanded ? '' : '__rotate_90'}`
                  "
                  @click="comment.itemPaneExpanded = !comment.itemPaneExpanded"
                  ></i>
                  <span @click="eyesClick(comment, '1')">
                    符合数&nbsp;
                    <a style="color: #42b56a;">
                      {{comment.passCount}}</a
                    >&nbsp;
                    <i
                      class="gda_sdk_iconfont"
                      :class="comment.currentOpenEyesType == '1' ? 'icon-icon_xianshikai show-anchors' : 'icon-icon_xianshiguan'
                      "
                    ></i>
                  </span>
                </span>
              </template>

              <!-- 不符合类 -->
              <template v-if="comment.status == 0">
                <span class="count_info_item">
                  <i :class="
                  `gda_sdk_iconfont icon-down title_r ${comment.itemPaneExpanded ? '' : '__rotate_90'}`
                  "
                  @click="comment.itemPaneExpanded = !comment.itemPaneExpanded"
                  ></i>
                  <span @click="eyesClick(comment, '0')">
                    不符合数&nbsp;
                    <a style="color: #e94d4d;">
                      {{comment.errCount}}</a
                    >&nbsp;
                    <i
                    class="gda_sdk_iconfont"
                    :class="comment.currentOpenEyesType == '0' ? 'icon-icon_xianshikai show-anchors' : 'icon-icon_xianshiguan'
                    "
                  ></i>
                  </span>
                </span>
                <span class="count_info_item" @click="eyesClick(comment, '1')">
                  <span>
                    符合数&nbsp;
                    <a style="color: #42b56a;">
                      {{comment.passCount}}</a
                    >&nbsp;
                  </span>
                  <i
                    class="gda_sdk_iconfont"
                    :class="comment.currentOpenEyesType == '1' ? 'icon-icon_xianshikai show-anchors' : 'icon-icon_xianshiguan'
                    "></i>
                </span>
              </template>
            </div>
            <div class="conclusion-title">
              <i
                v-if="comment.adoption"
                class="gda_sdk_iconfont icon-cainayinzhang"
              ></i>
            </div>
            <template v-if="showOpinionContentAndAdoptBtn(comment)">
              <div class="comment-btns" v-if="!comment.adoption">
                <el-button
                  type="primary"
                  @click="acceptCommentHandle(comment)"
                >
                  <i class="gda_sdk_iconfont icon-duigou"></i>采纳
                </el-button>
              </div>
            </template>
          </div>

          <div v-if="comment.itemPaneExpanded" class="element-results">
            <template v-for="(eR, idx) in elementResultsV(comment)">
              <div 
                @click="
                activeElementResultIndex === idx ? 
                activeElementResultIndex = null : activeElementResultIndex = idx"
                class="element-result-item"
                :class="{ active: activeElementResultIndex === idx }"
              >
                <div class="result-name">
                  <span class="result-index" style="vertical-align: top"
                    >{{ idx + 1 }}、</span
                  >
                  <span style="display: inline-block;max-width: 88%;vertical-align: top;word-break: break-all;">
                    图纸:{{ eR.drawingEleName }}（ID：{{ eR.drawingId }} : {{ eR.drawingEleId || '' }}）
                    <br />
                    模型:（ID：{{ eR.modelId }} : {{ eR.componentId }}）
                    <!-- <template v-if="eR.componentId">
                    <br />
                    构件:
                    <span>{{ eR.componentName }}（ID：{{ eR.componentId }}）</span>
                    </template> -->
                  </span>
                </div>
                <div class="result-name" v-if="eR.componentId || eR.componentName">
                  构件:
                  <span>{{ eR.componentName || '' }}（ID：{{ eR.componentId || '--' }}）</span>
                </div>
                <div>
                  {{ eR.message }}
                </div>
              </div>
            </template>

            <div
              v-if="(elementResultsVTotal(comment) || []).length > 5"
              class="more"
              @click="comment.showAll = !comment.showAll"
            >
              {{ comment.showAll ? '收起更多' : '展开更多'}}
              <i :class="comment.showAll ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
            </div>
          </div>
        </div>

      </div>
      </div>
    </template>

    <div v-else class="comment-list--empty">
      <img src="/src/assets/auto_review_finish.gif" />
      <div>无数据</div>
    </div>
  </div>
</template>
<script>
/* Copyright (C) <1998-2024> Glodon Company Limited
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import autolistSearch from './autolistSearch.vue'
import { ElPopover, ElButton } from 'element-plus'
import Tabs from '../model/Tabs.js'
export default {
  name: 'commentListOfReview',
  components: {autolistSearch, ElPopover, ElButton},
  inject: ["Markups"],
  data () {
    return {
      tabs: [
        // {
        //   tabName: "不符合", // tab页名称
        //   list: [
        //     {
        //       name: "审查点1", // 名称
        //       opinionText: "546657675567567756", // 内容
        //       count: "9", // 数量
        //       strong: false, // 是否强条
        //       elementResults: [ // 详情
        //         {
        //           drawingId: "", // 图纸id
        //           modelId: "", // 模型id

        //           componentId: 270097, // 构件id
        //           componentName: "", // 构件名称              
        //           viewEleBox: [ // 构件包围盒信息
        //             {x: 1, y: 1},
        //             {x: 2, y: 2}
        //           ],
        //           message: "", // 意见内容
        //         }
        //       ]
        //     }
        //   ]
        // }
      ], // tab页
      activeTabData: null,
      viewer: null, // 外联viewer对象（Model或Review 实例）

      activeTabIndex: null,
      search: "",

      activeCommentIndex: null,

      activeElementResultIndex: null,

      inSearching: false,
    }
  },
  computed: {
    showOpinionContentAndAdoptBtn () {
      return val => {
        return (val.status || val.checkPointState) == '0'
      }
    },
    elementResultsV () {
      return (comment) => {
        let arr = this.elementResultsVTotal(comment)
        if (comment.showAll) {
          return arr
        } else {
          return arr.slice(0, 5)
        }
      }
    },
    elementResultsVTotal () {
      return (comment) => {
        let currentOpenEyesType = comment.currentOpenEyesType
        let arr = comment.elementResults || []
        if (currentOpenEyesType !== null) {
          arr = arr.filter(item => {
            return item.elementState == currentOpenEyesType
          })
        }
        return arr
      }
    },
    currentDataList () {
      const _this = this
      return searchInput => {
        if (_this.activeTabData) {
          return this.activeTabData.list.filter(item => {
            if (searchInput) {
              return item.opinionText.includes(searchInput) || item.name.includes(searchInput)
            }
            return true
          })
        }
        return []
      }
    },
  },
  props: {
    dataSource: {
      type: Object,
      default: null
    },
  },
  watch: {
    search: {
      handler(val) {
        this.activeCommentIndex = null
      }
    },
    dataSource: {
      handler (val, oldVal) {
        if (val) {
          this.tabs = new Tabs(val, true)
          
          this.search = ""
          this.activeElementResultIndex = null

          // 初始进入或重新对tabs赋予新值时
          if (!oldVal || (val[0] != oldVal[0] || val[1] != oldVal[1])) {
            // 默认第一个tab active
            if (!this.activeTabIndex) {
              this.activeTabIndex = 0
            }
          }
          if (val.length) {
            this.activeTabData = this.tabs[this.activeTabIndex]
          }
        }
      },
      immediate: true
    },
    activeTabData: {
      handler (val) {
        const _this = this
        // 默认展开第一项
        if (val && val.list && val.list.length) {
          this.activeCommentIndex = 0
          val.list[0].itemPaneExpanded = true
          val.list[0].currentOpenEyesType = val.list[0].checkPointState || val.list[0].status

          // 组织批注绘制数据
          let tempL = []
          let d = this.elementResultsVTotal(val.list[0]) || []
          d.forEach(e => {
            tempL.push(_this.formatMarkupItemData(e))
          })
          this.Markups.list = tempL
        }
      },
      immediate: true
    },
    activeElementResultIndex: {
      handler (val) {
        this.Markups.activeIndex = val
      }
    }
  },
  created () {},
  methods: {
    getBox3d (box) {
      const _this = this
      return new Promise(async (resolve, reject) => {
        try {
          let p0 = await _this.$parent?.outerChin?.getModelPositionByViewPosition(box[0])
          let p1 = await _this.$parent?.outerChin?.getModelPositionByViewPosition(box[1])
          if (p0 && p1) {
            resolve([p0, p1])
          } else {
            resolve(null)
          }
        } catch (e) {
          resolve(null)
        }
      })
    },

    formatMarkupItemData (e) {
      let ret = {
        componentId: e.componentId,
        componentName: e.componentName,
        box: e.viewEleBox,
        drawingEleBox: e.drawingEleBox,
        content: e.message,
        views: e.views,
        bimFileId: e.bimFileId
      }
      return ret
    },
    setActiveAnnorIndex (index) {
      this.activeElementResultIndex = index
    },
    tabClick (index, data) {
      if (this.activeTabIndex !== index) {
        this.activeTabIndex = index
        this.activeTabData = data
      }
    },
    async commentClick (c, index) {
      const _this = this
      if (this.activeCommentIndex === index) {
        this.activeCommentIndex = null
        // 取消构件明细active项
        this.activeElementResultIndex = null
      } else {
        this.activeCommentIndex = index
        // 默认眼睛展开
        c.itemPaneExpanded = true
        c.currentOpenEyesType = c.checkPointState || c.status
        // 取消构件明细active项
        this.activeElementResultIndex = null
      }

      // 组织批注绘制数据
      let tempL = []
      if (this.activeCommentIndex !== null) {
        let d = this.elementResultsVTotal(c) || []
        d.forEach(e => {
          tempL.push(_this.formatMarkupItemData(e))
        })
      }
      this.Markups.list = tempL
    },
    eyesClick (comment, openEyesType) {
      const _this = this
      if (comment.currentOpenEyesType == openEyesType) {
        comment.currentOpenEyesType = null
      } else {
        comment.currentOpenEyesType = openEyesType
      }

      if (comment.currentOpenEyesType) {
        comment.itemPaneExpanded = true
      } else {
        comment.itemPaneExpanded = false
      }

      // 组织批注绘制数据
      let tempL = []
      if (!comment.currentOpenEyesType) {
        // 取消构件明细active项
        this.activeElementResultIndex = null
      } else {
        let d = this.elementResultsVTotal(comment)// comment.elementResults || []
        d.forEach(e => {
          tempL.push(_this.formatMarkupItemData(e))
        })
      }
      this.Markups.list = tempL
    },

    acceptCommentHandle (comment, successCallBack) {
      this.waittingAcceptComment = comment
      this.$emit("acceptFunCallBack", {
        data: comment,
        successCallBack: successCallBack || this.acceptSuccessHandle
      })
    },
    acceptSuccessHandle () { // 采纳成功回调
      this.waittingAcceptComment.adoption = true
    }
  }
}
</script>
<style lang="less" scoped>
@import './assets/common.less';

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

.list-scroll {
  height: 60px;
  line-height: 60px;
  .list-scroll--loading {
    height: 100%;
    .el-loading-mask {
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

.comment-list {
  height: calc(100% - 110px);
  position: relative;
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
  .__vuescroll {
    height: calc(100% - 54px) !important;
  }
  .categoty {
    .categoty-item {
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
      width: 72px;
      height: 72px;
      margin-bottom: 12px;
    }
  }

  .comment-list--failed {
    text-align: center;
    padding-top: 152px;
    .loadingfaildCommon();
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
.comment-category_tab {
  user-select: auto;
  font-size: 0px;
  width: @commentPanelWidth;
  border-bottom: 1px solid rgba(84, 86, 100, 1);
  margin: 0 auto;
  padding: 12px 0;
  position: relative;

  .category-item {
    display: inline-block;
    background: rgba(84, 86, 100, 1);
    border-radius: 2px 0px 0px 2px;
    width: 90px;
    line-height: 30px;
    font-size: 14px;
    color: rgba(242, 242, 248, 1);
    text-align: center;
    cursor: pointer;

    &.active {
      background: rgba(18, 107, 255, 1);
    }

    + .category-item {
      margin-left: 12px;
    }
  }

  .search{
    position: absolute;
    top: 11px;
    right: 0px;
  }
}

.comment {
  width: @commentPanelWidth;
  margin: 0 auto;
  color: #f2f2f8;
  margin-top: 12px;
  border-bottom: 1px solid #545664;

  .comment-title {
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

  .comment-point {
    margin-top: 6px;
    font-size: 14px;

    span {
      display: inline-block;
      min-width: 80px;
    }

    .gda_sdk_iconfont {
      cursor: pointer;
    }

    .show-anchors {
      color: rgba(18, 107, 255, 1);
    }

    .count_info_item +.count_info_item{
      margin-left: 16px;
    }
  }

  .comment-conclusion {
    border: 1px solid #545664;
    border-radius: 2px;
    margin-top: 6px;

    .conclusion-title {
      font-size: 12px;
      padding-left: 8px;
      padding-top: 4px;
      padding-bottom: 4px;
      border-bottom: 1px solid #545664;
      position: relative;

      .icon-cainayinzhang {
        font-size: 60px;
        position: absolute;
        top: -34px;
        right: 42px;
        color: #4FC403;
      }
    }

    .conclusion-info {
      padding: 8px;
    }
  }

  .comment-btns {
    text-align: right;
    margin-top: 6px;
    margin-bottom: 12px;

    .el-button {
      width: 60px;
      height: 24px;
      line-height: 20px;
      background-color: #126bff;
      color: #f2f2f8;
      border-color: #126bff;
    }
  }
}

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

.list-scroll {
  height: 60px;
  line-height: 60px;
  .list-scroll--loading {
    height: 100%;
    .el-loading-mask {
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

.comment-list {
  height: calc(100% - 54px);
  position: relative;
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
  .__vuescroll {
    height: calc(100% - 54px) !important;
  }
  .categoty {
    .categoty-item {
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
      width: 72px;
      height: 72px;
      margin-bottom: 12px;
    }
  }

  .comment-list--failed {
    text-align: center;
    padding-top: 152px;
    .loadingfaildCommon();
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

.comment {
  width: @commentPanelWidth;
  margin: 0 auto;
  color: #f2f2f8;
  margin-top: 12px;
  border: 1px solid #545664;
  border-radius: 1px;
  &:hover {
    border: 1px solid #126bff;
  }
  &.active {
    .comment-content {
      background: #18181e;
    }
  }
  .comment-title {
    display: flex;
    align-items: center;
    padding: 0 36px 0 16px;
    font-size: 14px;
    font-weight: 500;
    height: 48px;
    background: #393b4c;
    word-break: break-all;
    cursor: pointer;

    i {
      font-size: 10px;
      margin-right: 10px;
    }
    > p {
      display: flex;
      overflow: hidden;
      align-items: center;
      .content {
        flex: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .gda_sdk_iconfont.checked {
        width: 14px;
        color: #42b56a;
        margin-left: 5px;
      }
    }
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
  .comment-content {
    padding: 8px 12px;
    font-size: 16px;
    line-height: 25px;
    :deep(p) {
      margin: 0 !important;
    }
    .article-info {
      max-height: 250px;
      overflow: auto;
      .scroll-bar();
    }
  }
  .comment-func {
    display: flex;
    margin-top: 6px;
    justify-content: space-between;
    align-items: center;
  }
  .comment-point {
    font-size: 14px;
    cursor: pointer;
    span {
      display: inline-block;
      min-width: 80px;
    }

    .gda_sdk_iconfont {
      cursor: pointer;
    }

    .show-anchors {
      color: rgba(18, 107, 255, 1);
    }
  }

  .conclusion-title {
    font-size: 12px;
    padding-left: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
    position: relative;
    .icon-cainayinzhang {
      font-size: 60px;
      position: absolute;
      top: -26px;
      right: 0;
      z-index: 9;
      color: #4FC403;
    }
  }

  .conclusion-info {
    padding: 8px;
  }

  .comment-btns {
    text-align: right;
    // margin-top: 6px;
    // margin-bottom: 12px;
    display: flex;
    align-items: center;
    .el-button {
      width: 60px;
      height: 24px;
      line-height: 20px;
      background-color: #126bff;
      color: #f2f2f8;
      border-color: #126bff;
    }
  }
}
.element-results {
  margin-top: 8px;
  .more {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #f2f2f8;
  }
  .element-result-item {
    padding: 12px;
    background-color: none;
    border: 1px solid #545664;
    box-sizing: border-box;
    line-height: 22px;
    border-radius: 2px;
    font-size: 14px;
    &:not(:last-child) {
      margin-bottom: 6px;
    }
    .result-index {
      margin-right: 4px;
    }
    .result-name {
      margin-bottom: 8px;
    }
    &:hover {
      border: 1px #126bff solid;
    }
    &.active {
      background-color: rgba(18, 107, 255, 0.3);
      border: 1px #126bff solid;
    }
  }
}

:deep(.auto-detail-tooltip) {
  max-width: 300px;
  .title {
    word-break: break-all;
    padding-bottom: 8px;
    font-size: 14px;
  }
}
.__rotate_90{
  transform: rotate(-90deg);
  display: inline-block;
}
.title_r{
  font-size: 12px;
  position: relative;
  bottom: 2px;
  margin-right: 4px;
}
.__scroll{
  height: calc(100% - 72px);
  overflow-y: auto;
  padding-bottom: 12px;
}
</style>
