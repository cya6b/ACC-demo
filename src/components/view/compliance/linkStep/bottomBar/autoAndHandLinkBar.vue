<template>
  <template v-if="unstart">
    <el-button
      type="primary"
      @click="startSmartLink"
      :disabled="disabled"
    >
      开始智能关联
    </el-button>
  </template>
  <template v-else-if="processing">
    <el-button
      type="primary"
      @click="endSmartAndStarthandLink"
    >
      中止，进行手动关联
    </el-button>
  </template>
  <template v-else-if="fail">
    <el-button
      type="primary"
      @click="starthandLink"
    >
    进行手动关联
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
    startSmartLink () {
      this.$emit('startSmartLink')
    },
    endSmartAndStarthandLink () {
      this.$emit('endSmartAndStarthandLink')
    },
    starthandLink () {
      this.$emit('starthandLink')
    }
  },
}
</script>

<style>

</style>