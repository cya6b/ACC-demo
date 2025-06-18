import axios from 'axios'
import to from 'await-to-js'
import SparkMD5 from "spark-md5"
import {getUploadUrl, uploadCallback} from './api'

const getFileMD5 = function (file) {
  return new Promise((resolve, reject) => {
      if (file instanceof File) {
          const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
              chunkSize = 2097152, // Read in chunks of 2MB
              chunks = Math.ceil(file.size / chunkSize),
              spark = new SparkMD5.ArrayBuffer(),
              fileReader = new FileReader()
          let currentChunk = 0

          fileReader.onload = function (e) {
              spark.append(e.target.result) // Append array buffer
              currentChunk++

              if (currentChunk < chunks) {
                  loadNext()
              } else {
                  resolve(spark.end())
              }
          }

          fileReader.onerror = function () {
              reject()
          }

          let loadNext = function () {
              const start = currentChunk * chunkSize,
                  end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize

              fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
          }

          loadNext()
      } else {
          reject()
      }
  })
}

export default class UploadSpartMupti {
  constructor (params) {
      if (!params.file) {
          throw new Error('params file is required')
      }
      if (!params.uploadInfoUrl) {
          throw new Error('params uploadInfoUrl is required')
      }

      this.file = params.file
      this.uploadInfoUrl = params.uploadInfoUrl
      this.handleProcess = params.handleProcess
      this.successCallBack = params.successCallBack
      this.failCallBack = params.failCallBack

      // 文件分片结果
      this.filePartList = []
      // 成功上传的分片
      this.successFilePartList = []
      // 失败上传的分片
      this.failFilePartList = []
      // 上传接口配置参数信息
      this.uploadInterfaceSettingData = null
      // 是否上传成功
      this.uploadSuccessfull = false
      // 上传结果
      this.uploadResult = null

      // 上传控制
      // 是否处于暂停
      this.inStopping = false
      // 是否取消了上传
      this.canceled = false
  }
  async start () {
    this.successFilePartList = []
    this.failFilePartList = []

    const md5 = await getFileMD5(this.file)
    const [uploadUrlSettingErr, uploadUrlSettingRes] = await to(getUploadUrl(this.uploadInfoUrl, {
        filename: this.file.name,
        fileSize: this.file.size,
        md5,
        multipart: true,
        uploadType: 'STREAM'
    }))
    if (uploadUrlSettingRes?.data?.code === 'SUCCESS') {
      this.uploadInterfaceSettingData = uploadUrlSettingRes.data.detail
      if (this.uploadInterfaceSettingData.multipart) {
        this.#spartFile()
      }
      this.#upload(this.filePartList)
    } else {
      this.uploadResult = {
        code: -1,
        message: '获取上传接口失败!',
        errInfo: uploadUrlSettingErr
      }
      this.#end()
    }
  }
  cancelUpload () {
    this.canceled = true
  }
  reStartUpload () {
    this.canceled = false
    this.inStopping = false
    if (this.uploadFilePartListCache) {
      // 清空上传失败列表
      this.failFilePartList = []
      this.#upload(this.uploadFilePartListCache, true)
    } else {
      this.start()
    }
  }
  stopUpload () {
    this.inStopping = true
  }
  continueUpload () {
    this.inStopping = false
  }
  #spartFile () {
    if (!this.uploadInterfaceSettingData.multipartUploadURLs?.length) {
      this.uploadResult = {
        code: -1,
        message: '分片信息不存在!'
      }
      return this.#end()
    }
    // 分片
    let partSize = this.uploadInterfaceSettingData.partSize
    this.uploadInterfaceSettingData.multipartUploadURLs.forEach((item, index) => {
      const { name, type, size } = this.file;
      // 生成文件hash
      const spark = new SparkMD5.ArrayBuffer();
      spark.append(this.file);
      const hexHash = spark.end();
      // 生成文件后缀
      const extName = name.substring(name.lastIndexOf("."));
      const startIndex = partSize * index;
      const endIndex =
      startIndex + partSize > size ? size : startIndex + partSize;
      const blobPart = this.file.slice(startIndex, endIndex, type);
      // 生成分片文件 这里通过 File 给个文件名
      const blobFile = new File([blobPart], `${hexHash}-${index}${extName}`, {
        type,
      });

      this.filePartList.push({
        partIndex: index,
        file: blobFile,
        urlParamsInfo: item,
      })
    })
  }
  #upload (filePartList, isReStartUpload = false) {
    if (!this.uploadInterfaceSettingData) {
      return
    }
    const _this = this
    if (this.uploadInterfaceSettingData.multipart) {
      // 缓存
      this.uploadFilePartListCache = filePartList

      // 上传分片文件
      let index = 0
      f (index)
      function f (index) {
        if (_this.inStopping) {
          setTimeout(() => {
            f(index)
          }, 500)
          return
        }
        if (_this.canceled) {
          return
        }
        let item = filePartList[index]

        // 若为重新上传，已成功上传分片可跳过，无须重复上传
        if (isReStartUpload) {
          if(_this.successFilePartList.find(i => {
            return i === item
          })) {
            if (index < filePartList.length - 1) {
              f(++index)
            } else {
              // 文件合并
              _this.#mergeFile()
            }
            return
          }
        }
        let uploadUrl = item.urlParamsInfo.uploadURL
        let uploadMethod = item.urlParamsInfo.method
        let uploadHeaders = item.urlParamsInfo.headers
        const formData = new FormData()
        formData.append('file', item.file)

        const CancelToken = axios.CancelToken
        const source = CancelToken.source()
        item.cancelSource = source
        axios({
          url: uploadUrl,
          method: uploadMethod,
          headers: {
              "Content-Type": 'application/octet-stream',
              ...uploadHeaders
          },
          data: item.file,
          cancelToken: source.token,
          onUploadProgress: (e) => {
            if (_this.inStopping || _this.canceled) {
              return
            }
            if (typeof _this.handleProcess === 'function') {
              // 计算整体progress上传进度
              let hasUploadFilePartCount = _this.successFilePartList.length + _this.failFilePartList.length
              let totalFilePartCount = filePartList.length
              let currentFileProgress = e.progress * (1 / totalFilePartCount)
              e.progress = (hasUploadFilePartCount / totalFilePartCount) + currentFileProgress
              _this.handleProcess(e)
            }
          }
        }).then(res => {
          if (res.status === '200' || res.status === '204') {
            _this.successFilePartList.push(item)
          } else {
            _this.failFilePartList.push(item)
          }
        }).catch (err => {
          console.error(err)
          _this.failFilePartList.push(item)
        }).finally(() => {
          if (_this.failFilePartList.length) { // 存在上传失败的分片，中止上传
            _this.uploadResult = {
              code: -1,
              message: '存在上传失败的分片!'
            }
            _this.#end()
          } else if (index === filePartList.length - 1) { // 全部上传完毕
            _this.#mergeFile()
          } else { // 上传下一个分片
            f(++index)
          }
        })
      }
    } else {
      let callBackURL = this.uploadInterfaceSettingData.callback
      let uploadURL = this.uploadInterfaceSettingData.uploadURL
      const CancelToken = axios.CancelToken
      const source = CancelToken.source()
      axios({
        url: uploadURL,
        method: 'POST',
        data: this.file,
        headers: {
            "Content-Type": 'application/octet-stream'
        },
        cancelToken: source.token,
        onUploadProgress: (e) => {
          if (_this.inStopping || _this.canceled) {
            return
          }
          if (typeof _this.handleProcess === 'function') {
            _this.handleProcess(e)
          }
        }
      }).then(res => {
        if (res?.data?.code === 'SUCCESS' || res.status === 204 || res.status === 200) {
          axios.post(callBackURL).then(res => {
            if (_this.inStopping) {
              setTimeout(() => {
                resultB()
              }, 500)
              return
            } else if (_this.canceled) {
              return
            }
            resultB()
            function resultB () {
              if (res.data.code === 'SUCCESS') {
                _this.uploadResult = {
                  code: 'SUCCESS',
                  message: '上传成功!',
                  detail: res.data.detail
                }
                _this.uploadSuccessfull = true
                _this.#end()
              } else {
                _this.uploadResult = {
                  code: -1,
                  message: '上传失败!'
                }
                _this.#end()
              }
            }
          }).catch(err => {
            this.uploadResult = {
              code: -1,
              message: '上传回调函数失败!'
            }
            this.#end()
          })
        } else {
          this.uploadResult = {
            code: -1,
            message: '上传失败!'
          }
          this.#end()
        }
      }).catch(err => {
        console.error(err)
        this.uploadResult = {
          code: -1,
          message: '上传失败!'
        }
        this.#end()
      })
    }
  }

  #mergeFile () {
    const _this = this
    // 文件合并
    let url = _this.uploadInterfaceSettingData.callback
    axios({
      url,
      method: 'POST',
    }).then(res => {
      if (res?.data?.code === 'SUCCESS') {
        _this.uploadResult = {
          code: 'SUCCESS',
          message: '上传成功!',
          detail: res.data.detail
        }
        _this.uploadSuccessfull = true
      } else if (res?.data.code === 'RETRY') {
        _this.inMergering = true
        setTimeout(() => {
          _this.#mergeFile()
        }, 2000)
      } else {
        // 需放弃上传的分片，重新上传
        _this.uploadFilePartListCache = null
        _this.uploadResult = {
          code: -1,
          message: 'callBack失败!'
        }
      }
    }).catch(err => {
      console.error(err)
      // 需放弃上传的分片，重新上传
      _this.uploadFilePartListCache = null
      _this.uploadResult = {
        code: -1,
        message: 'callBack失败!'
      }
    }).finally(() => {
      if (!_this.inMergering) {
        _this.#end()
      } else {
        _this.inMergering = false
      }
    })
  }

  #end () {
    if (this.canceled) {
      return
    }
    if (this.uploadSuccessfull) {
      if (this.successCallBack) {
        this.successCallBack(this.uploadResult)
      }
    } else {
      if (this.failCallBack) {
        this.failCallBack(this.uploadResult)
      }
    }
  }
}
