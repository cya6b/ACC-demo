import axios from 'axios'
import SparkMD5 from "spark-md5";
/**
 * @description: 获取上传地址
 */
function getUploadUrl(url, params) {
    return axios.post(url, params)
}

/**
 * @description: 上传文件
 */
function uploadFile(params) {
    const uploadParams = params.uploadParams
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    const chunkSize = 50 * 1024 * 1024; // 默认分片大小为50兆。1kb = 1024byte, 1m = 1024 kb

    if (params.getCancelSource && (typeof params.getCancelSource === 'function')) {
        params.getCancelSource(source)
    }
    if (params.storageType === 'GOS') {
        return axios({
            url: params.uploadUrl,
            method: 'POST',
            data: params.file,
            headers: {
                "Content-Type": 'application/octet-stream'
            },
            cancelToken:source.token,
            onUploadProgress: (e) => {
                if (typeof params.handleProcess === 'function') {
                    params.handleProcess(e)
                }
            }
        })
    } else {
        // 表单文件流上传
        const formData = new FormData()
        if (uploadParams) {
            Object.keys(uploadParams).forEach((key) => {
                formData.append(key, uploadParams[key])
            })
        }
        if (params.file) {
            formData.append('file', new Blob([params.file]))
        }
        return axios({
            url: params.uploadUrl,
            method: 'POST',
            data: formData,
            cancelToken:source.token,
            onUploadProgress: (e) => {
                if (typeof params.handleProcess === 'function') {
                    params.handleProcess(e)
                }
            }
        })
    }
}

function uploadFileByMd5(params) {
    const uploadParams = params.uploadParams
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()

    return axios({
        url: params.uploadUrl,
        method: 'POST',
        data: uploadParams,
        cancelToken:source.token
    })
}

/**
 * @description: 上传回调
 */
function uploadCallback(params) {
    return axios.post(params.callbackUrl)
}

export {getUploadUrl, uploadFile, uploadFileByMd5, uploadCallback}
