<template>
  <div class="auto_list_of_review_v2">
    <autoListOfReview ref="autoListOfReview" :showAdopt="showAdopt" :dataSource="filterTabsData"
      :filterInputClass="'filter_input_override'"
      :commentCategoryTabClass="'commont_category_tab_override'"
      @acceptFunCallBack="acceptFunc"
      @showDetailHandle="showDetail"
      @commentUpdate="commentUpdate">
      <template #filterHeader>
        <tag-label-list v-if="showTagFilter" class="tag_label_list" :listData="tagList"
          @selectedChange="tagSelectedChange" :defaultActiveKeys="['ALL']"></tag-label-list>  
        <conditional-filter :checkObjects="checkObjects" :specifications="specifications"
          :class="`conditional_filter ${showTagFilter ? 'with_filter_head' : ''}`" @filterParamsChange="filterParamsChange"></conditional-filter>
      </template>
    </autoListOfReview>
  </div>
</template>

<script>
/* Copyright (C) <1998-2024> Glodon Company Limited
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import TagLabelList from './components/LabelList.vue';
import autoListOfReview from '../autoListOfReview.vue';
import ConditionalFilter from './components/ConditionalFilter.vue';

const tagsSortInfo = [
  '通用', '消防', '给水', '排水', '循环水', '室外给排水', '雨控',
  '通风', '供暖', '空调', '动力', '强电', '弱电', '人防', '节能',
  '无障碍', '防水', '防潮', '绿建', '景观', '安全', '品质', '规划'
]
export default {
  props: {
    tagFilterList: {
      type: Array,
      default: []
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
  components: {
    TagLabelList,
    ConditionalFilter,
    autoListOfReview
  },
  data () {
    return {
      paneData: null,
      tagList: [],
      tags: [],
      filterParams: null,
      checkObjects: [],
      specifications: []
    }
  },
  computed: {
    showTagFilter () {
      return this.tagFilterList.length
    },
    filterTabsData () {
      let ret = JSON.parse(JSON.stringify(this.paneData)) || []

      // tabs数据过滤
      // 按专项标签筛选
      if (this.tags.length) {
        if (!this.tags.includes('ALL')) {
          ret.forEach(item => {
            if (item.list && item.list.length) {
              item.list = item.list.filter(iItem => {
                return iItem.tagItemList?.find(tagItem => {
                  return this.tags.find(t => {
                    return t == tagItem.name
                  })
                })
              })
              item.count = item.list.length
            }
          })
        }
      }
      if (this.filterParams) {
        // 按强条筛选
        if (this.filterParams.strong !== null) {
          ret.forEach(item => {
            if (item.list && item.list.length) {
              item.list = item.list.filter(iItem => {
                return iItem.strong === this.filterParams.strong
              })
              item.count = item.list.length
            }
          })
        }
        // 按审查对象筛选
        if (this.filterParams.checkObjecList.length) {
          ret.forEach(item => {
            if (item.list && item.list.length) {
              item.list = item.list.filter(iItem => {
                return iItem?.checkObjectList?.find(cItem => {
                  return this.filterParams.checkObjecList.find(c => {
                    return c == cItem.name
                  })
                })
              })
              item.count = item.list.length
            }
          })
        }
        // 按规范标准筛选
        if (this.filterParams.specificationList.length) {
          ret.forEach(item => {
            if (item.list && item.list.length) {
              item.list = item.list.filter(iItem => {
                return this.filterParams.specificationList.find(sItem => {
                  return sItem == iItem.specificationContent
                })
              })
              item.count = item.list.length
            }
          })
        }
      }
      return ret
    }
  },
  methods: {
    commentUpdate (comment) {
      if (!comment) {
        return
      }
      let id = comment.id
      this.paneData.forEach(item => {
        item.list.forEach((i, index) => {
          if (i.id === id) {
            item.list[index] = comment
          }
        })
      })
    },
    getCountByTagKey (key, list) {
      let count = 0
      list.forEach(l => {
        if (key == 'ALL') {
          count += l.list?.length || 0
        } else {
          if (l.list) {
            l.list.forEach(item => {
              if (item.tagItemList?.find(t => {
                return t.name == key
              })) {
                count++
              }
            })
          }
        }
      })
      return count
    },
    filterParamsChange (val) {
      this.filterParams = JSON.parse(JSON.stringify(val))
    },
    tagSelectedChange (tags) {
      this.tags = tags
    },
    acceptFunc (val) {
      this.$emit("acceptFunCallBack", val)
    },
    showDetail (val) {
      this.$emit("showDetailHandle", val)
    },

    setActiveAnnorIndex (index) {
      this.$refs.autoListOfReview.setActiveAnnorIndex(index)
    },
    
    back () {
      this.$refs.autoListOfReview.back()
    },
    initNumOfTagList (val) {
      const _this = this
      if (_this.paneData) {
        let total = {
          key: 'ALL',
          label: `全部 ${_this.getCountByTagKey('ALL', _this.paneData)}`
        }
        let ret = [total]
        if (val) {
          val.forEach(v => {
            let vNum = _this.getCountByTagKey(v, _this.paneData)
            ret.push({
              key: v,
              label: `${v} ${vNum}`
            })
          })
        }
        this.tagList = ret
      } else {
        setTimeout(() => {
          _this.initNumOfTagList(val)
        }, 50)
      }
    }
  },
  watch: {
    dataSource: {
      handler (val, oldVal) {
        if (val) {
          this.paneData = val

          // 给条件筛选：审查对象列表和规范条文列表数据赋值
          let checkObjects = []
          let specifications = []
          this.paneData.forEach(tab => {
            if (tab.list) {
              tab.list.forEach(tL => {
                if (tL.checkObjectList) {
                  tL.checkObjectList.forEach(cItem => {
                    if (!checkObjects.find(cItem2 => { return cItem.name == cItem2})) {
                      checkObjects.push(cItem.name)
                    }
                  })
                }

                if (tL.name && !specifications.find(sItem => { return sItem == tL.specificationContent})) {
                  specifications.push(tL.specificationContent)
                }
              })
            }
          })
          this.checkObjects = checkObjects
          this.specifications = specifications
        }
      },
      immediate: true
    },
    tagFilterList: {
      handler (val) {
        if (val && Array.isArray(val)) {
          // 标签排序
          let sortVal = []
          tagsSortInfo.forEach(t => {
            if (val.find(v => {
              return v == t
            })) {
              sortVal.push(t)
            }
          })
          let leaveVal = val.filter(v => {
            return !sortVal.find(sV => {
              return sV == v
            })
          })
          sortVal = sortVal.concat(leaveVal)
          // 初始化标签数目
          this.initNumOfTagList(sortVal)
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.auto_list_of_review_v2{
  height: calc(100% - 54px);
  :deep(.comment-list) {
    height: 100%;
  }

  .tag_label_list{
    margin: 0px 24px;
    padding-top: 12px;
  }

  :deep(.__scroll) {
    height: calc(100% - 116px) !important;
  }
}
:deep(.filter_input_override){
  top: -46px !important;
  right: 48px !important;

  max-width: calc(100% - 24px);

  .autolist-operator{
    top: 4px !important;
  }
}
:deep(.commont_category_tab_override) {
  .category-item{
    padding: 0px 2px;
    text-align: left !important;
    width: auto !important;
    max-width: 72px !important;
    background: none !important;
    color: rgba(242, 242, 248, 0.70);

    position: relative;
    top: 1px;
    &+.category-item {
      margin-left: 16px !important;
    }
    &.active{
      font-weight: bold;
      color: #F7F8FA;

      border-bottom: 2px solid #126BFF;
    }

    .tab_count{
      margin-left: 4px;
    }
  }
}

.conditional_filter{
  position: absolute;
  right: 24px;
  top: 17px;
  z-index: 1;
  width: 90px;
}
.conditional_filter.with_filter_head {
  top: 60px;
}
</style>