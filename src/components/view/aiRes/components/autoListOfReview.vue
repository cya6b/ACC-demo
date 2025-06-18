<template>
  <!-- 设计质量审查结果 -->
  <div class="comment-list">
    <slot name="filterHeader"></slot>
    <autolistSearch :class="`search ${filterInputClass}`" @inputHandle="(value) => {search = value}"></autolistSearch>
    <div v-if="tabs.length" :class="`comment-category_tab ${commentCategoryTabClass}`">
      <div
        v-for="(tab, tabIndex) in tabs"
        :key="tabIndex"
        @click="tabClick(tabIndex, tab)"
        class="category-item"
        :class="{ active: activeTabIndex === tabIndex }"
      >
        {{ tab.tabName }} <span class="tab_count">{{ tab.count }}</span>
      </div>

      <div class="bottom_line"></div>
    </div>

    <div v-if="currentDataList(search).length" class="scroll-bar __scroll">
      <div
        v-for="(comment, commentIndex) in currentDataList(search)"
        class="comment"
        :key="comment.id + '_' + commentIndex"
      >
        <div class="comment-title">
          <span v-if="comment.strong" class="strong-badge">强条</span>
          <articlePopover key="articlePopover" :comment="comment"></articlePopover>
          <span class="detail-btn" @click="autoDetailClick(comment)">
            详情 >
          </span>
        </div>

        <div class="comment-point">
          <span>审查点数&nbsp;{{ (comment.detail || []).length }}</span>

          <!-- 通过类 -->
          <span v-if="comment.status == '1'"
            >正常数&nbsp;
            <a style="color: #42b56a;">{{ comment.passCount }}</a
            >&nbsp;
            <i
              class="gda_sdk_iconfont"
              :class="
                commentIndex === activeItemIndex
                  ? 'icon-icon_xianshikai show-anchors'
                  : 'icon-icon_xianshiguan'
              "
              @click="eyesClick(comment, commentIndex)"
            ></i>
          </span>
          <!-- 未审查类 -->
          <span v-else-if="comment.status == '2'">未审查</span>
          <!-- 存疑类 -->
          <span v-else-if="comment.status == '-1' && comment.doubtCount">
            存疑数&nbsp;
            <a style="color: #F8830B">{{ comment.doubtCount }}</a
            >&nbsp;
            <i
              class="gda_sdk_iconfont"
              :class="
                commentIndex === activeItemIndex
                  ? 'icon-icon_xianshikai show-anchors'
                  : 'icon-icon_xianshiguan'
              "
              @click="eyesClick(comment, commentIndex, '-1')"
            ></i>
          </span>
          <!-- 不通过类 -->
          <span v-else-if="comment.errCount"
            >问题数&nbsp;
            <a style="color: #FF5151">{{ comment.errCount }}</a
            >&nbsp;
            <i
              class="gda_sdk_iconfont"
              :class="
                commentIndex === activeItemIndex
                  ? 'icon-icon_xianshikai show-anchors'
                  : 'icon-icon_xianshiguan'
              "
              @click="eyesClick(comment, commentIndex, '0')"
            ></i>
          </span>
        </div>
        <!-- 不通过和存疑的条文显示:意见和采纳按钮 -->
        <template v-if="showOpinionContentAndAdoptBtn(comment)">
          <div class="comment-conclusion">
            <div class="conclusion-title">
              审查意见
              <i
                v-if="comment.adoption"
                class="gda_sdk_iconfont icon-cainayinzhang"
              ></i>
            </div>
            <div class="conclusion-info">
              {{ comment.opinionText }}
            </div>
          </div>

          <!-- 采纳 -->
          <div class="comment-btns">
            <el-button
              type="primary"
              v-if="showAdopt && !comment.adoption"
              @click="acceptCommentHandle(comment)"
            >
              <i class="gda_sdk_iconfont icon-duigou"></i>采纳
            </el-button>
          </div>
        </template>
        <div v-else style="height:12px"></div>

      </div>
    </div>
    <div v-else class="comment-list--empty">
      <img src="/src/assets/auto_review_finish.gif" />
      <div>无数据</div>
    </div>

    <!-- 详情 -->
    <auto-detail
      class="detail_box"
      ref="autoDetail"
      v-show="showAutoDetail"
      :showAdopt="showAdopt"
      @goBackHandle="showAutoDetail = false"
      :acceptCommentHandle="acceptCommentHandle"
      :comment="currentAutoDetailComment" />
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
import AutoDetail from './autoDetail.vue'
import { ElButton } from 'element-plus'

import articlePopover from './popover/articlePopover.vue'
import Tabs from '../model/Tabs.js'
export default {
  name: 'commentListOfReview',
  components: {autolistSearch, AutoDetail, ElButton, articlePopover},
  inject: ["Markups"],
  data () {
    return {
      tabs: [
        // {
        //   tabName: "", // tab页名称
        //   list: [
        //     {
        //       name: "", // 名称
        //       opinionText: "", // 内容
        //       count: "9", // 数量
        //       strong: false, // 是否强条
        //       detail: [ // 详情
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
      showAutoDetail: false, // 是否展示详情
      activeItemIndex: null,

      inSearching: false,
    }
  },
  computed: {
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

    showOpinionContentAndAdoptBtn () {
      return val => {
        return val.status == '-1' || val.status == '0'
      }
    }
  },
  props: {
    commentCategoryTabClass: {
      type: String,
      default: ''
    },
    filterInputClass: {
      type: String,
      default: ''
    },
    dataSource: {
      type: Object,
      default: null
    },
    showAdopt: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    dataSource: {
      handler (val, oldVal) {
        this.clearMarkups()
        if (val) {
          this.tabs = new Tabs(val)
          
          this.search = ""
          this.activeItemIndex = null

          // 初始进入或重新对tabs赋予新值时
          if (!oldVal || (val[0] != oldVal[0] || val[1] != oldVal[1])) {
            this.showAutoDetail = false
            if (!this.activeTabIndex) {
              this.activeTabIndex = 0
            }
          }

          if (val.length) {
            this.activeTabData = this.tabs[this.activeTabIndex]
          }
        }
      },
      immediate: true,
      deep: true
    },
  },
  created () {},
  methods: {
    setActiveAnnorIndex (index) {
      this.Markups.activeIndex = index
      this.$refs.autoDetail && this.$refs.autoDetail.setActiveAnnorIndex(index)
    },
    forward () {
      this.$emit("showDetailHandle", true)
    },
    back () {
      this.$refs.autoDetail && this.$refs.autoDetail.back()
    },
    tabClick (index, data) {
      if (this.activeTabIndex !== index) {
        this.activeTabIndex = index
        this.activeTabData = data
      }

      // 清除
      this.clearMarkups()
    },
    clearMarkups () {
      this.activeItemIndex = null
      this.Markups.list = []
      this.Markups.activeIndex = null
    },
    autoDetailClick (comment) {
      this.currentAutoDetailComment = comment
      this.showAutoDetail = true
      this.forward()

      // 清除 展开的审查点的展开状态
      this.activeItemIndex = null
      
      // 清除当前详情中展示的批注和锚点信息
      this.Markups.activeIndex = null
      // 先取消active后清除列表
      this.$nextTick(() => {
        this.Markups.list = []
      })
    },
    eyesClick (comment, index, filterStatus = null) {
      if (this.activeItemIndex === index) {
        this.activeItemIndex = null
      } else {
        this.activeItemIndex = index
      }

      // 组织批注绘制数据
      let tempL = []
      if (this.activeItemIndex !== null) {
        let cD = comment.detail || []
        cD.forEach(d => {
          let eRes = d.elementResults || []
          if (filterStatus) {
            eRes = (d.elementResults || []).filter(e => {
              return e.status == filterStatus
            })
          }
          eRes.forEach(e => {
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
        })
      }
      this.Markups.list = tempL
      this.Markups.activeIndex = null
    },

    acceptCommentHandle (comment) {
      this.waittingAcceptComment = comment
      this.$emit("acceptFunCallBack", {
        data: comment,
        successCallBack: this.acceptSuccessHandle
      })
    },
    acceptSuccessHandle () { // 采纳成功回调
      this.waittingAcceptComment.adoption = true
      this.$emit('commentUpdate', this.waittingAcceptComment)
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
.comment-category_tab {
  user-select: auto;
  font-size: 0px;
  width: @commentPanelWidth;
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

  .bottom_line{
    height: 1px;
    background: rgba(84, 86, 100, 1);
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
      min-width: 96px;
    }

    .gda_sdk_iconfont {
      cursor: pointer;
    }

    .show-anchors {
      color: rgba(18, 107, 255, 1);
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

.detail_box{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: calc(100% - 12px);
  overflow-y: auto;
  background: #282a34;
  z-index: 2;
}
:deep(.auto-detail-tooltip) {
  max-width: 300px;
  .title {
    word-break: break-all;
    padding-bottom: 8px;
    font-size: 14px;
  }
}
.__scroll{
  height: calc(100% - 72px);
  overflow-y: auto;
  padding-bottom: 12px;
}

.search{
  position: absolute;
  top: 11px;
  right: 24px;
  z-index: 1;

  :deep(.autolist-operator) {
    width: calc(100% - 36px) !important;
  }
}
</style>
