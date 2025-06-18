const filenameMinWidth = 220
const uploadTimeWidth = 172
const fieSizeWidth = 120
const optWidth = 120
export default {
  default: [
    {
      key: 'filename',
      label: '文件名称',
      minWidth: filenameMinWidth
    },
    {
      key: 'fileSize',
      label: '大小',
      width: fieSizeWidth
    },
    {
      key: 'fileUploadTime',
      label: '上传时间',
      width: uploadTimeWidth
    },
    {
      key: 'opt',
      label: '操作',
      width: optWidth
    }
  ],
  drawing: [
    {
      key: 'grahNumber',
      label: '图号'
    },
    {
      key: 'grahName',
      label: '图名'
    },
    {
      key: 'grahSize',
      label: '图幅'
    },
    {
      key: 'signInfo',
      label: '签章信息'
    },
    {
      key: 'filename',
      label: '文件名称',
      minWidth: filenameMinWidth
    },
    {
      key: 'fileType',
      label: '文件类型'
    },
    {
      key: 'fileFloor',
      label: '楼层'
    },
    {
      key: 'fileSize',
      label: '大小',
      width: fieSizeWidth
    },
    {
      key: 'fileUploadTime',
      label: '上传时间',
      width: uploadTimeWidth
    },
    {
      key: 'opt',
      label: '操作',
      width: optWidth
    }
  ],
  model: [
    {
      key: 'filename',
      label: '模型名称',
      minWidth: filenameMinWidth
    },
    {
      key: 'fileSize',
      label: '大小',
      width: fieSizeWidth
    },
    {
      key: 'fileUploadTime',
      label: '上传时间',
      width: uploadTimeWidth
    },
    {
      key: 'translateStatus',
      label: '状态'
    },
    {
      key: 'opt',
      label: '操作',
      width: optWidth
    }
  ]
}