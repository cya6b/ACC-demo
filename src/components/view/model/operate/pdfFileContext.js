let getFindContainer = function () {
  return this.my__viewer.findContainer
}
let initFindContainer = function () {
  if (this.my__viewer && !this.my__viewer.findContainer.findController) {
    this.my__viewer.initFindController()
    return this.my__viewer.findContainer
  }
}

let pdfContent = {
  getNumber () {
    return 1
  },
  moveTo (x, y) { // 左上角移动至坐标（x, y）位置

  },

  searchPdfText (text, callBack) {
    let findContainer = getFindContainer.call(this)
    if (!findContainer.findController) {
      findContainer = initFindContainer.call(this)
    }
    if (findContainer.eventBus) {
      let evt = {
        type: '',
        query: text,
        phraseSearch: false,
        caseSensitive: false,
        highlightAll: true
        // findPrevious: false
      }
      // findContainer.findController.executeCommand('find' + evt.type, {
      //   query: evt.query,
      //   phraseSearch: evt.phraseSearch,
      //   caseSensitive: evt.caseSensitive,
      //   highlightAll: evt.highlightAll,
      //   findPrevious: evt.findPrevious
      // })

      findContainer.eventBus.dispatch('findfromurlhash', {
        source: this,
        query: evt.query,
        phraseSearch: evt.phraseSearch
      })
      setTimeout(() => {
        callBack({
          total: findContainer.findController._matchesCountTotal
        })
      }, 500) // 延迟时间要大于250ms
    }
  },
  // 查找当前上一个或下一个
  findAgain (text, isPre) {
    let findContainer = getFindContainer.call(this)
    if (!findContainer.findController) {
      findContainer = initFindContainer.call(this)
    }
    if (findContainer.eventBus) {
      // findContainer.findBar.dispatchEvent('again', isPre)
      findContainer.eventBus.dispatch('find', {
        source: this,
        query: text,
        type: 'again',
        phraseSearch: true,
        caseSensitive: true,
        entireWord: true,
        highlightAll: true,
        findPrevious: isPre
      })
    }
  }
}
export default pdfContent
