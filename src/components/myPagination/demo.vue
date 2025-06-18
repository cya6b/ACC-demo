<template>
  <div>
    <my-pagination :total="total" v-model:pageSize="size" v-model:currentPage="page"
        :updateData="search"></my-pagination>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      total: 0,
      page: 1,
      size: 10
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    search () {
    }
  }
}
</script>
<style lang='less' scoped>

</style>
