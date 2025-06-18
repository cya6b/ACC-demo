<template>
  <div v-if="!noHeader" class="header">
    <header></header>
  </div>
  <div :class="`wrap_page ${noHeader ? '__no_header' : ''}`">
    <router-view/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      noHeader: !!this.$route.meta.noHeader,
    }
  }
}
</script>

<style lang="less" scoped>
.header{
  height: 48px;
  background-image: url(/@/assets/top_header.jpg);
}
.wrap_page{
  height: calc(100% - 50px);
  overflow-y: auto;
}
.wrap_page.__no_header{
  height: 100%;
}
</style>
