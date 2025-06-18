<template>
  <span class="actualy_box_inner">
    <span class="actualy_box_key">{{label}}</span>
    <span class="actualy_box_value">{{ num || 0 }}</span>
  </span>
</template>

<script>
export default {
  props: {
    label: {
      default: '',
      type: String
    },
    num: {
      default: 0,
      type: Number
    }
  }
}
</script>

<style lang="less" scoped>
.actualy_box_inner {
  height: 18px;
  border: solid #a0a2ad 1px;
  border-radius: 2px;
  font-size: 12px;
  background-color: #f2f3f7;
  display: inline-block;

  .actualy_box_key {
    border-right: solid #a0a2ad 1px;
  }

  .actualy_box_key,
  .actualy_box_value {
    line-height: 18px;
    float: left;
    padding: 0 4px;
    text-indent: 0;
  }
}
</style>