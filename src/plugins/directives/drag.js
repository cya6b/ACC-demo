export default function drag(el) {
  let oDiv = el // 当前元素
  // let self = this // 上下文
  // 禁止选择网页上的文字
  document.onselectstart = function () {
      return false
  }
  oDiv.onmousedown = function (e) {
    // 鼠标按下，计算当前元素距离可视区的距离
    let disX = e.clientX - oDiv.offsetLeft
    let disY = e.clientY - oDiv.offsetTop
    document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        let l = e.clientX - disX
        let t = e.clientY - disY
        // 移动当前元素
        oDiv.style.left = l + 'px'
        oDiv.style.top = t + 'px'
    }
    document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
    }
    // return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
    return false
  }
}
