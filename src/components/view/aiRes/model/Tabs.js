/* Copyright (C) <1998-2024> Glodon Company Limited
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import tabTypeEnums from './tabTypeEnums'
export default class Tabs{
  constructor (val, isCompare = false) {
    let tabTypeList = tabTypeEnums.review_enums
    if (isCompare) {
      tabTypeList = tabTypeEnums.compare_enums
    }
    let tabs = tabTypeList.map(t => {
      return {
        tabName: t.tabName, // tab页名称
        tabType: t.tabType,
        count: 0,  // 该tab 名称后跟的数量信息
        list: []
      }
    })
    if (Array.isArray(val)) {
      val.forEach(v => {
        let tab = tabs.find(t => {
          return t.tabType === v.tabType
        })
        if (tab) {
          tab.list = v.list
          tab.count = v.list.length
        }
      })
    }
    return tabs
  }
}