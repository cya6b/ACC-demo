const funcs = {
  getMatricParam (points) {
    const dist = (x1, y1, x2, y2) => {
      const a = x1 - x2
      const b = y1 - y2
      return Math.sqrt(a * a + b * b)
    }
    const getAngle = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
      const dot = x1 * x2 + y1 * y2
      const det = x1 * y2 - y1 * x2
      const angle = (Math.atan2(det, dot) / Math.PI) * 180
      return Math.round(angle + 360) % 360
    }
    let res = {
      sacale: 0,
      angle: 0,
      positionChange: {
        x: 0,
        y: 0
      }
    }
    let [x1, y1, x2, y2, m1, n1, m2, n2] = points.map(p => {
      return isNaN(Number(p)) ? 0 : Number(p)
    })
    const sacale = dist(m1, n1, m2, n2) / dist(x1, y1, x2, y2)

    // 矫正缩放后的坐标
    m1 = m1 / sacale
    n1 = n1 / sacale
    m2 = m2 / sacale
    n2 = n2 / sacale
    let mm = m2 - m1 + x1
    let nn = n2 - n1 + y1
    const angle = getAngle(
      {
        x: x2 - x1,
        y: y2 - y1
      },
      {
        x: mm - x1,
        y: nn - y1
      }
    )

    const angleRa = (angle * Math.PI) / 180
    // 矫正旋转后的坐标
    const tempM1 = m1
    const tempN1 = n1
    m1 = tempM1 * Math.cos(-angleRa) - tempN1 * Math.sin(-angleRa)
    n1 = tempN1 * Math.cos(-angleRa) + tempM1 * Math.sin(-angleRa)

    const xD = m1 - x1
    const yD = n1 - y1
    res.sacale = sacale
    res.angle = angle
    res.positionChange.x = xD
    res.positionChange.y = yD
    return res
  },

  // 计算matric4变换矩阵数据的行向量表述
  getMatric4Data (points) {
    if (!Array.isArray(points) || points.length !== 8) {
      return []
    }
    const matrixMul = (a, b) => {
      if (!Array.isArray(a) || !Array.isArray(b)) {
        return
      }
      if (!a.length || a[0].length !== b.length) {
        return
      }
      let c = new Array(a.length)
      for (let i = 0; i < a.length; i++) {
        c[i] = new Array(b[0].length)
        for (let j = 0; j < b[0].length; j++) {
          c[i][j] = 0
          for (let k = 0; k < b.length; k++) {
            c[i][j] += a[i][k] * b[k][j]
          }
        }
      }
      return c
    }

    const getLocalMatrix = (scaleMatrix, rotationMatrix, positionMatrix) => {
      return matrixMul(positionMatrix, matrixMul(rotationMatrix, scaleMatrix))
    }

    const matricParams = funcs.getMatricParam(points)
    const sacale = matricParams.sacale
    const scaleMatrix = [
      [sacale, 0, 0, 0],
      [0, sacale, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ]
    const angle = matricParams.angle
    const angleRa = (angle * Math.PI) / 180
    const rotationMatrix = [
      [Math.cos(angleRa), Math.sin(angleRa), 0, 0],
      [-Math.sin(angleRa), Math.cos(angleRa), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ]

    // 矫正旋转后的坐标
    const xD = matricParams.positionChange.x
    const yD = matricParams.positionChange.y
    const positionMatrix = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [xD, yD, 0, 1]
    ]

    const localMatrix = getLocalMatrix(
      scaleMatrix,
      rotationMatrix,
      positionMatrix
    )
    return localMatrix
  },

  // 坐标变换
  coordinateTrans (point, matricData) {
    if (!point || point.x === undefined || point.y === undefined) {
      return
    }
    let res = {
      x: 0,
      y: 0
    }
    let x = Number(point.x)
    let y = Number(point.y)
    if (Array.isArray(matricData)) {
      if (Array.isArray(matricData[0])) {
        res.x = matricData[0][0] * x + matricData[1][0] * y + matricData[3][0]
        res.y = matricData[0][1] * x + matricData[1][1] * y + matricData[3][1]
      } else if (matricData.length === 16) {
        res.x = matricData[0] * x + matricData[4] * y + matricData[12]
        res.y = matricData[1] * x + matricData[5] * y + matricData[13]
      }
    } else if (typeof matricData === 'object') {
      if (
        !matricData ||
        matricData.sacale === undefined ||
        matricData.angle === undefined ||
        !matricData.positionChange ||
        matricData.positionChange.x === undefined ||
        matricData.positionChange.y === undefined
      ) {
        return
      }
      x /= matricData.sacale
      y /= matricData.sacale
      let angleRa = (matricData.angle * Math.PI) / 180
      const tempX = x
      const tempY = y
      x = tempX * Math.cos(-angleRa) - tempY * Math.sin(-angleRa)
      y = tempY * Math.cos(-angleRa) + tempX * Math.sin(-angleRa)
      x -= matricData.positionChange.x
      y -= matricData.positionChange.y
      res.x = x
      res.y = y
    }
    return res
  },
}
export default funcs
