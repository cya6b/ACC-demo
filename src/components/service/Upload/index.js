import {getUploadUrl, uploadFile, uploadFileByMd5, uploadCallback} from './api'
import to from 'await-to-js'
import SparkMD5 from 'spark-md5'

import UploadSpartMulti from './UploadSpartMulti'

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

            function loadNext() {
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

const upload = async function ({file = null, uploadInfoUrl = null, handleProcess = null, getCancelSource = null}) {
    if (!file) {
        console.error('file为空')
        return
    }
    if (!uploadInfoUrl) {
        console.error('uploadInfoUrl为空')
        return
    }
    const md5 = await getFileMD5(file)
    const [getUploadUrlErr, getUploadUrlRes] = await to(getUploadUrl(uploadInfoUrl, {
        filename: file.name,
        fileSize: file.size,
        md5
    }))
    if (getUploadUrlRes?.data?.code === 'SUCCESS') {
        let {storageType, callback, uploadParams, uploadURL, uploadUrl, uploadByMd5} = getUploadUrlRes.data.detail
        let md5UploadSuccess = false
        let [uploadFileErr, uploadFileRes] = [null, null]
        if (!!uploadByMd5) {
            try {
                [uploadFileErr, uploadFileRes] = await to(uploadFileByMd5({storageType, uploadUrl: uploadByMd5, handleProcess, getCancelSource}))
                if (uploadFileRes && uploadFileRes?.data?.code === 'SUCCESS') {
                    md5UploadSuccess = true
                }
            } catch (err) {
                console.error(err)
            }
        }

        if (!md5UploadSuccess) {
            [uploadFileErr, uploadFileRes] = await to(uploadFile({storageType, uploadUrl: uploadURL || uploadUrl, uploadParams, file, handleProcess, getCancelSource}))
        }

        if (uploadFileRes && (uploadFileRes.status === 200 || uploadFileRes.status === 204)) {
            if (md5UploadSuccess) {
                if (uploadFileRes?.data?.code === 'SUCCESS') {
                    return Promise.resolve(uploadFileRes.data.detail)
                }
            } else if (callback) {
                const [uploadCallbackErr, uploadCallbackRes] = await to(uploadCallback({callbackUrl: callback}))
                if (uploadCallbackRes?.data?.code === 'SUCCESS') {
                    return Promise.resolve(uploadCallbackRes.data.detail)
                } else {
                    return Promise.reject(uploadCallbackErr)
                }
            }
        } else {
            return Promise.reject(uploadFileErr)
        }
    } else {
        return Promise.reject(getUploadUrlErr)
    }
}

const multipartUpload = function ({file = null, uploadInfoUrl = null, handleProcess = null}, successCallBack, failCallBack) {
    let up = new UploadSpartMulti({
        file,
        uploadInfoUrl,
        handleProcess,
        successCallBack,
        failCallBack
    })
    up.start()
    return up
}

export default {upload, getFileMD5, multipartUpload}
