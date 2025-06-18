const funcs = {
  det(square) {
    // 方阵约束
    if (square.length !== square[0].length) {
        throw new Error();
    }
    // 方阵阶数
    let n = square.length;

    let result = 0;
    if (n > 3) {
        // n 阶
        for (let column = 0; column < n; column++) {
            // 去掉第 0 行第 column 列的矩阵
            let matrix = new Array(n - 1).fill(0).map(arr => new Array(n - 1).fill(0));
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - 1; j++) {
                    if (j < column) {
                        matrix[i][j] = square[i + 1][j];
                    } else {
                        matrix[i][j] = square[i + 1][j + 1];
                    }
                }
            }
            result += square[0][column] * Math.pow(-1, 0 + column) * funcs.det(matrix);
        }
    } else if (n === 3) {
        // 3 阶
        result = square[0][0] * square[1][1] * square[2][2] +
                square[0][1] * square[1][2] * square[2][0] +
                square[0][2] * square[1][0] * square[2][1] -
                square[0][2] * square[1][1] * square[2][0] -
                square[0][1] * square[1][0] * square[2][2] -
                square[0][0] * square[1][2] * square[2][1];
    } else if (n === 2) {
        // 2 阶
        result = square[0][0] * square[1][1] - square[0][1] * square[1][0];
    } else if (n === 1) {
        // 1 阶
        result = square[0][0];
    }
    return result;
  },
  transpose(matrix) {
    let result = new Array(matrix.length).fill(0).map(arr => new Array(matrix[0].length).fill(0));
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[0].length; j++) {
            result[i][j] = matrix[j][i];
        }
    }
    return result;
  },
  adjoint(square) {
    // 方阵约束
    if (square[0].length !== square.length) {
        throw new Error();
    }

    let n = square.length;

    let result = new Array(n).fill(0).map(arr => new Array(n).fill(0));
    for (let row = 0; row < n; row++) {
        for (let column = 0; column < n; column++) {
            // 去掉第 row 行第 column 列的矩阵
            let matrix = [];
            for (let i = 0; i < square.length; i++) {
                if (i !== row) {
                    let arr = [];
                    for (let j = 0; j < square.length; j++) {
                        if (j !== column) {
                            arr.push(square[i][j]);
                        }
                    }
                    matrix.push(arr);
                }
            }
            result[row][column] = Math.pow(-1, row + column) * funcs.det(matrix);
        }
    }
    return funcs.transpose(result);
  },
  // 矩阵求逆
  inv (square) {
    if (square[0].length !== square.length) {
        throw new Error();
    }
    let detValue = funcs.det(square);
    let result = funcs.adjoint(square);
   
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result.length; j++) {
            result[i][j] /= detValue;
        }
    }
    return result;
  },
  groupList(array, group) {
    let index = 0;
    let newArray = [];
    while (index < array.length) {
      newArray.push(array.slice(index, (index += group)));
    }
    return newArray;
  },

  // 文件大小
  formatFileSize(size) {
    // 文件大小展示格式，小数点保留2位
    const G = 1024 * 1024 * 1024
    const M = 1024 * 1024
    const K = 1024
    if (!size) {
      return 0
    } else if (size < K) {
      return `${size} B`
    } else if (size < M) {
      size = (size / K).toFixed(2)
      return `${size} K`
    } else if (size < G) {
      size = (size / M).toFixed(2)
      return `${size} M`
    } else {
      size = (size / G).toFixed(2)
      return `${size} G`
    }
  },

  similarThan (bounding1, bounding2, baseBound) {
    let ret = false
    if (!bounding1 || !bounding2 || !baseBound) {
      return ret
    }
    let bounding1Width = Math.abs(bounding1[1][0] - bounding1[0][0])
    let bounding1Height = Math.abs(bounding1[1][1] - bounding1[0][1])
    let bounding2Width = Math.abs(bounding2[1][0] - bounding2[0][0])
    let bounding2Height = Math.abs(bounding2[1][1] - bounding2[0][1])
    let baseBoundWidth = Math.abs(baseBound[1][0] - baseBound[0][0])
    let baseBoundHeight = Math.abs(baseBound[1][1] - baseBound[0][1])

    // 若 bounding1 区域大于 baseBound ，则舍弃
    if((bounding1Width > baseBoundWidth * 1.05) || (bounding1Height > baseBoundHeight * 1.05)) {
      return false
    }
    let a = Math.abs(bounding1Width - baseBoundWidth) + Math.abs(bounding1Height - baseBoundHeight)
    let b = Math.abs(bounding2Width - baseBoundWidth) + Math.abs(bounding2Height - baseBoundHeight)
    ret = a < b
    return ret
  },

  strInsert (index = 0, baseStr = '', inserStr = '') {
    let ret = baseStr
    let arr = baseStr.split('')
    arr.splice(index, 0, inserStr)
    ret = arr.join('')
    return ret
  },

  dataURLtoFile (dataURL, fileName) {
    const arr = dataURL.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], fileName, {type: mime})
  },

  /**
   * @param {character[][]} grid
   * @return {Array}
  */
  findAlllands (grid) { // 查找二维数组中所有的孤岛
    let mapList = []
    let width = grid.length
    let height = grid[0] && grid[0].length
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        if (grid[i][j]) {
          let fRList = mapListFind(i, j)
          if (fRList.length) {
            pushIn(mapList, fRList[0], i, j)
            if (fRList.length > 1) {
              merge(mapList, fRList[0], fRList[1])
            }
          } else {
            mapList.push({ minX: i, maxX: i, minY: j, maxY: j, data: [{ x: i, y: j }] })
          }
        }
      }
    }

    function pushIn (mapList, fR, i, j) {
      if (mapList[fR]) {
        mapList[fR].data.push({ x: i, y: j })
        if (mapList[fR].minX > i) mapList[fR].minX = i
        if (mapList[fR].minY > j) mapList[fR].minY = j
        if (mapList[fR].maxX < i) mapList[fR].maxX = i
        if (mapList[fR].maxY < j) mapList[fR].maxY = j
      }
    }

    function mapListFind (i, j) {
      let result = []
      if (!mapList.length) {
        return result
      }
      mapList.map((item, index) => {
        if (item.data.find(itemI => {
          return (itemI.x === i - 1 && itemI.y === j) || (itemI.x === i && itemI.y === j - 1)
        })) {
          result.push(index)
        }
      })
      return result
    }

    function merge (mapList, first, second) {
      let f = mapList[first]
      let s = mapList[second]
      let temp = {
        minX: Math.min(f.minX, s.minX),
        minY: Math.min(f.minY, s.minY),
        maxX: Math.max(f.maxX, s.maxX),
        maxY: Math.max(f.maxY, s.maxY),
        data: f.data.concat(s.data)
      }
      mapList.splice(Math.max(first, second), 1)
      mapList.splice(Math.min(first, second), 1)
      mapList.push(temp)
    }

    return mapList
  },
}
export default funcs