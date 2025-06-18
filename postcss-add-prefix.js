import postcss from 'postcss'
export default postcss.plugin('postcss-add-css-prefix', function (opts = {}) {
  const { prefix = '' } = opts

  // 接收两个参数，第一个是每个css文件的ast，第二个参数中可获取转换结果相关信息(包括当前css文件相关信息)
  function plugin(css, result) {
    if (!prefix) return // 没传入prefix，不执行下面的逻辑
    css.walkRules((rule) => {
      // 遍历当前ast所有rule节点
      const { selector } = rule
      // 加了个flag，防止节点更新后重复执行该逻辑进入死循环
      if (
        selector.includes('.el-') &&
        !selector.includes(prefix) &&
        !rule.flag &&
        !selector.includes('.el-popper') &&
        !selector.includes('.el-overlay')
      ) {
        rule.flag = true
        const clone = rule.clone()
        clone.selector = `${prefix} ${selector}`
        rule.replaceWith(clone)
      } else if (
        !selector.includes(prefix) &&
        !rule.flag &&
        selector.includes('.el-popper')
      ) {
        // 处理挂载于body下面节点的样式
      }
    })
  }

  return plugin
})