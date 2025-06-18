<template>
  <div @drop.prevent.stop="onDrop" @dragover.prevent="act.dragover = true" @dragleave.prevent="act.dragover = false">
      <slot></slot>
  </div>
</template>

<script>
export default {
    data () {
        return {
            act: {
                dragover: false
            }
        }
    },
    props: {
        accept: {
            type: Array,
            default: () => []
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onDrop (e) {
            if (this.disabled) {
                return
            }
            this.act.dragover = false
            let files = [].slice.call(e.dataTransfer.files)
            if (this.accept) {
                // 文件扩展名检查
                let name = ''
                const reg = /\.(.+)$/
                const acceptArr = [].slice.call(this.accept)

                files = files.filter(f => {
                    name = f.name
                    let r = false
                    const match = name.match(reg)
                    if (match) {
                        r = acceptArr.some(str => str.toLowerCase() === match[1].toLowerCase())
                    }
                    return r
                })
            }
            this.$emit('dropFunc', files)
        }
    }
}
</script>

<style>

</style>