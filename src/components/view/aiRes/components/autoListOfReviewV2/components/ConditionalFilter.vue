<template>
  <el-dropdown ref="filterDropdown" class="filter" popper-class="filter_pane_popper" trigger="click"
    @visible-change="val => dropdownVisible = val" :teleported="false">
    <span class="el-dropdown-link">
      <span class="search-text">{{ filterSearchText }}</span>
      <CaretTopIcon v-if="dropdownVisible" class="dropdown-icon"></CaretTopIcon>
      <CaretBottomIcon v-else class="dropdown-icon"></CaretBottomIcon>
    </span>
    <template #dropdown>
      <div class="filter-dropdown-menu">
        <el-tabs v-model="currentTab">
          <el-tab-pane name="strong" label="是否强条">
            <p v-for="sItem in strongFilterList" class="strong-option" :class="values.strong === sItem.value ? 'active':''"
                @click="values.strong = sItem.value">
              <span>{{ sItem.label }}</span>
              <CheckIcon v-if="values.strong == sItem.value" class="item_checked_icon"></CheckIcon>
            </p>
          </el-tab-pane>
          <el-tab-pane name="checkObject" :label="`审查对象${values.checkObjecList.length ? `(${values.checkObjecList.length})`: ''}`">
            <el-input v-model="checkObject.filterKeyword" :suffix-icon="Search" clearable
              placeholder="请输入审查对象名称" class="check-object-input"></el-input>
            <el-checkbox-group v-model="values.checkObjecList" class="check-object-checkbox-group">
              <el-checkbox v-for="checkObjItem in checkObjectList" :key="checkObjItem"
                            :label="checkObjItem"></el-checkbox>
            </el-checkbox-group>
            <div class="empty-tip" v-if="!checkObjectList.length">
              <img src="/src/assets/emptyicon.svg"/>
              <div>无相关结果</div>
            </div>
          </el-tab-pane>
          <el-tab-pane name="specification" :label="`规范标准${values.specificationList.length ? `(${values.specificationList.length})` : ''}`">
            <el-input v-model="specification.filterKeyword" :suffix-icon="Search" clearable
                      placeholder="请输入规范名称/规范编号" class="check-object-input"></el-input>
            <template v-if="specificationList.length">
              <el-checkbox v-if="specifications.length && !specification.filterKeyword" v-model="specification.checkAll"
                :indeterminate="specification.isIndeterminate"
                @change="handleCheckAllSpecificationChange"
                >{{ checkAllSpeificationLabel }}</el-checkbox>
              <el-checkbox-group v-model="values.specificationList"
                class="check-object-checkbox-group specification_checkbox_group">
                <el-checkbox v-for="specItem in specificationList" :key="specItem" :title="specItem"
                              :label="specItem"></el-checkbox>
              </el-checkbox-group>
            </template>
            <div class="empty-tip" v-if="!specificationList.length">
              <img src="/src/assets/emptyicon.svg"/>
              <div>无相关结果</div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="conditional-filter-opt-div">
          <el-button class="opt-btn reset-btn" @click="resetFilter">重置</el-button>
          <el-button class="opt-btn confirm-btn" @click="confirmFilter">确定</el-button>
        </div>
    </div>
    </template>
  </el-dropdown>
</template>

<script>
/* Copyright (C) <1998-2024> Glodon Company Limited
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import {CaretTop as CaretTopIcon, CaretBottom as CaretBottomIcon, Check as CheckIcon, Search} from '@element-plus/icons-vue';
import { ElDropdown, ElDropdownMenu, ElTabs, ElTabPane, ElInput, ElCheckboxGroup, ElCheckbox, ElButton } from 'element-plus';
const strongFilterList = [
  {
    label: '全部',
    value: null
  },
  {
    label: '强条',
    value: true
  },
  {
    label: '非强条',
    value: false
  },
]
export default {
  components: {
    ElDropdown,
    ElDropdownMenu,
    ElTabs,
    ElTabPane,
    ElInput,
    ElCheckboxGroup,
    ElCheckbox,
    ElButton,
    CaretTopIcon,
    CaretBottomIcon,
    CheckIcon,
    Search
  },
  props: {
    checkObjects: {
      type: Array,
      default: []
    },
    specifications: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      Search,
      strongFilterList,
      dropdownVisible: false,
      currentTab: 'strong',

      checkObject: {
        filterKeyword: '',
      },
      specification: {
        filterKeyword: '',
        checkAll: false,
        isIndeterminate: false,
      },

      valuesShot: {
        strong: null,
        checkObjecList: [],
        specificationList: []
      },
      values: {
        strong: null,
        checkObjecList: [],
        specificationList: []
      },
      valuesCache: null
    }
  },
  computed: {
    filterSearchText () {
      let ret = '条件筛选'
      if (this.valuesCache) {
        let strongStr = ''
        let checkPointStr = ''
        let specificationStr = ''
        if (this.valuesCache.strong !== null) {
          strongStr = this.valuesCache.strong ? '强条' : '非强条'
        }
        if (this.valuesCache.checkObjecList.length) {
          checkPointStr =  this.valuesCache.checkObjecList.join(',')
        }
        if (this.valuesCache.specificationList.length) {
          specificationStr =  this.valuesCache.specificationList.join(',')
        }
        ret = [strongStr, checkPointStr, specificationStr].filter(item => !!item).join(',') || ret
      }
      return ret
    },
    checkAllSpeificationLabel () {
      if (!this.values.specificationList.length) {
        return `全部 ${this.specifications.length} 本规范`
      }
      return `已选 ${this.values.specificationList.length} 本规范`
    },
    checkObjectList () {
      let ret = this.checkObjects || []
      if (this.checkObject.filterKeyword) {
        ret = this.checkObjects.filter(item => {
          return (item || '').includes(this.checkObject.filterKeyword)
        })
      }
      return ret
    },
    specificationList  () {
      let ret = this.specifications || []
      if (this.specification.filterKeyword) {
        ret = this.specifications.filter(item => {
          return (item || '').includes(this.specification.filterKeyword)
        })
      }
      return ret
    },
  },
  methods: {
    handleCheckAllSpecificationChange (val) {
      this.values.specificationList = val ? this.specifications : []
      this.specification.isIndeterminate = false
    },
    handleCheckedSpecificationChange (value) {
      const checkedCount = value.length
      this.specification.checkAll = checkedCount === this.specifications.length
      this.specification.isIndeterminate = checkedCount > 0 && checkedCount < this.specifications.length
    },
    clearSearchKeyWord () {
      this.checkObject.filterKeyword = ''
      this.specification.filterKeyword = ''
    },
    confirmFilter (closeDropDown = true) {
      // 清空搜索
      this.clearSearchKeyWord()

      this.valuesCache = JSON.parse(JSON.stringify(this.values))
      this.$emit('filterParamsChange', this.values)

      if (closeDropDown) {
        this.$refs.filterDropdown?.handleClose()
      }
    },

    resetFilter () {
      this.values = JSON.parse(JSON.stringify(this.valuesShot))
      this.confirmFilter(false)
    }
  },
  watch: {
    dropdownVisible: {
      handler (val) {
        if (val) {
          this.valuesCache = JSON.parse(JSON.stringify(this.values))
        } else if (this.valuesCache) {
          this.values = JSON.parse(JSON.stringify(this.valuesCache))
        }
      },
      immediate: true
    },
    'values.specificationList': {
      handler (val) {
        this.handleCheckedSpecificationChange(val)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.filter {
  width: 112px;
  color: #F2F2F8;
  cursor: pointer;
  display: flex;
  flex-direction: row-reverse;
  border-left: 1px solid #545664;

  .el-dropdown-link {
    .search-text {
      display: inline-block;
      width: 66px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }

    .dropdown-icon {
      width: 18px;
    }
  }
}

.filter-dropdown-menu {
  padding: 8px 0px;

  background: #40424B;
  width: 404px;
  border: none;
  padding-bottom: 0;
  font-size: 14px;
  user-select: none;
}

.item_checked_icon {
  width: 20px;
}

</style>
<style lang="less">
.filter_pane_popper{
  border: none !important;
  background: none !important;

  .el-scrollbar {
    right: 18px !important;
  }
  .el-popper__arrow::before {
    background: #40424B !important;
    border: none !important;
  }

  .el-tabs {
    .el-tabs__header {
      margin: 0px;
    }
    .el-tabs__nav-wrap {
      .el-tabs__nav {
        margin-left: 16px !important;

        .el-tabs__active-bar {
          background-color: #126BFF;
        }

        .el-tabs__item {
          color: rgba(242, 242, 248, 0.7);
          padding: 0 8px;
          height: 32px;
          line-height: 32px;

          &.is-top:nth-child(2) {
            padding-left: 0;
          }

          &.is-active {
            color: rgba(247, 248, 250, 1);
          }
        }
      }

      &::after {
        display: none;
      }
    }

    .el-tabs__content {
      padding: 10px 16px;
      max-height: calc(100vh - 314px);
      overflow-y: auto;
      min-height: 100px;
    }

    .el-input__wrapper{
      background: #363842;
      box-shadow: none;
      border: 1px solid #545664;
      padding: 0;
      .el-input__inner{
        color: #f7f8fa;
      }
    }
  }

  .strong-option {
    color: #D1D1D1;
    cursor: pointer;
    display: flex;
    justify-content: space-between;

    &.active, &:hover {
      color: #F2F2F8;
    }
  }

  .check-object-input {
    &.el-input {
      margin-bottom: 4px;

      .el-input__inner {
        color: #86909C;
        border-color: #545664;
        background: #363842;
      }

      .el-icon-search {
        color: #F2F2F8;
        cursor: default;
      }
    }
  }

  .check-object-checkbox-group {
    width: calc(100% + 16px);
  }
  .specification_checkbox_group {
    .el-checkbox{
      display: block;
    }
    .el-checkbox__label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: calc(100% - 32px);
    }
  }
  
  .el-checkbox {
    margin: 8px 16px 0 0;

    .el-checkbox__input {
      .el-checkbox__inner {
        background-color: unset;
        border-color: #C9CDD4;
      }

      &.is-checked, &.is-indeterminate {
        .el-checkbox__inner {
          background-color: #126BFF;
          border-color: #126BFF;
        }
      }
      
    }

    .el-checkbox__label {
      color: #F2F2F8;
      font-weight: 400;
      padding-left: 8px;
    }
  }

  .empty-tip {
    text-align: center;
    color: #d1d1d1;

    img {
      width: 80px;
      height: 80px;
    }
  }

  .conditional-filter-opt-div {
    height: 48px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-top: 1px solid #545664;

    .opt-btn {
      width: 48px;
      height: 30px;
      line-height: 30px;
      margin-right: 16px;
      margin-left: 0px;
      color: #FFF;
      border: none;

      &.reset-btn {
        background: #40424B;
        border: 1px solid #126BFF;
      }

      &.confirm-btn {
        background: #126BFF;
      }
    }
  }

  .popper__arrow {
    border-bottom-color: #40424B !important;

    &::after {
      border-bottom-color: #40424B !important;
    }
  }
}
</style>