<template>
  <el-dropdown
    @command="cutModelShowType"
    placement="top"
    class="switch-floor-btn"
    :teleported="false"
  >
    <el-button>
      {{ modelShowType === 'all' ? '全楼模型' : '本层模型'
      }}<i class="gda_sdk_iconfont icon-down down_icon"></i>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="all">全楼模型</el-dropdown-item>
        <el-dropdown-item command="floor">本层模型</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElButton } from 'element-plus'
export default {
  components: {
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElButton
  },
  data () {
    return {
      modelShowType: 'floor'
    }
  },
  methods: {
    // 切换全楼和楼层
    cutModelShowType (e) {
      this.modelShowType = e
      this.$emit('cutModelShowType', e)
    },
  }
}
</script>

<style lang="less" scoped>
.switch-floor-btn {
  button {
    width: 124px;
    height: 52px;
    border: 1px #333 solid;
    border-radius: 0;
    background: rgba(17, 17, 17, 0.88);
    color: #d1d1d1;
    font-size: 14px;
    .down_icon{
      font-size: 12px;
      margin-left: 4px;
    }
  }

  position: absolute;
  bottom: 10px;
  border: none;
  text-align: left;
  padding: 0 15px;
  border-radius: 2px;
  left: 6px;
  z-index: 10;
  outline: none;
  cursor: pointer;

  :deep(.el-dropdown__popper) {
    inset: auto auto 54px 14px !important;
    .el-popper__arrow{
      display: none;
    }
  }
  :deep(.el-dropdown-menu) {
    padding: 0;
    // border: none;
    margin: 0;
    border-radius: 0;
    border: 1px #333 solid;
    background: none;
    .popper__arrow {
      display: none !important;
    }
    li.el-dropdown-menu__item {
      width: 122px;
      height: 52px;
      line-height: 52px;
      color: #d1d1d1;
      border-radius: 0;
      font-size: 14px;
      box-sizing: border-box;
      background: rgb(17, 17, 17) !important;
      &:hover {
        background: rgba(17, 17, 17, 0.88) !important;
      }
    }
  }
}

</style>