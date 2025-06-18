<template>
  <template v-if="unstart || fail">
    <el-button
      type="primary"
      @click="starthandLink"
    >
      开始手动关联
    </el-button>
  </template>
  <template v-else-if="success">
    <el-button
      type="primary"
      @click="starthandLink"
    >
      重新手动关联
    </el-button>
  </template>
</template>

<script>
const statusMap = {
  FAIL: 'fail',
  SUCCESS: 'success',
  UN_START: 'unstart',
  PROGRESS: 'progress'
}
import {ElButton} from 'element-plus'
export default {
  components: {ElButton},
  data () {
    return {
      status: '',
    }
  },
  props: {
    disabled: {
      type: Boolean
    },
    linkStatus: {
      type: String
    }
  },
  computed: {
    unstart () {
      return this.status === statusMap.UN_START
    },
    fail () {
      return this.status === statusMap.FAIL
    },
    success () {
      return this.status === statusMap.SUCCESS
    },
    processing () {
      return this.status === statusMap.PROGRESS
    }
  },
  watch: {
    linkStatus: {
      handler (val) {
        this.status = val
      },
      immediate: true
    }
  },
  methods: {
    starthandLink () {
      this.$emit('starthandLink')
    }
  }
}
</script>

<style>

</style>