export default {
  title: 'Uploader',
  desc: '文件上传对象',
  detail: [
    {
      title: 'property Methods',
      list: [
        {
          label: 'upload(params)',
          desc: '文件上传',
          parameters: [
            {
              name: 'params',
              type: 'Object',
              desc: '{file: File // 文件, uploadInfoUrl: url // 上传地址, handleProcess: Function // 上传进度回调}',
            }
          ]
        },
        {
          label: 'multipartUpload(params, successCallBack, failCallBack)',
          desc: '文件分片上传',
          parameters: [
            {
              name: 'params',
              type: 'Object',
              desc: '{file: File // 文件, uploadInfoUrl: url // 上传地址, handleProcess: Function // 上传进度回调}',
            }, {
              name: 'successCallBack',
              type: 'Function',
              desc: '上传成功回调',
            }, {
              name: 'failCallBack',
              type: 'Function',
              desc: '上传失败回调',
            }
          ]
        }
      ]
    },
  ]
}