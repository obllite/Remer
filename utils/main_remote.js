const path = require('path')
const fs = require('fs')
const axios = require('axios');
const FormData = require('form-data')

const main_process_utils = require('./index')

const serverURL = 'http://localhost:9090'

async function connectSever() {
    const response = await axios.get(`${serverURL}/test`, {});
    console.log(response);

}

function generatePath(config, name) {
    switch (config) {
        case "fold":
            return '/noteBooks/' + name
        case "file":
            return path.join(__dirname, '../noteBooks' + name)
        default:
            break;
    }
}
//`${serverURL}/upload`
async function uploadHandler() {
    console.log("up load file called")
    // 获取 slice num
    let sliceNum = 0
    main_process_utils.fileViewInfo.fileNames.forEach((fold_item, fold_index) => {
        fold_item.names.forEach((file_item, file_index) => {
            sliceNum++
        })
    })
    console.log('sliceNum is ', sliceNum)
    // 创建进度条
    main_process_utils.createTask('Upload file', sliceNum)
    // 上传文件到服务器
    main_process_utils.fileViewInfo.noteBookNames.forEach((item, index) => {
        let gpath = generatePath("fold", item)
        uploadFold(gpath)
    })
    main_process_utils.fileViewInfo.fileNames.forEach((fold_item, fold_index) => {
        fold_item.names.forEach((file_item, file_index) => {
            let relative = "/" + main_process_utils.fileViewInfo.noteBookNames[fold_index] + "/" + file_item
            let gpath = generatePath("file", relative)
            uploadAFile(gpath, relative)
        })
    })

}

function uploadFold(foldPath) {
    console.log('upload fold: ', foldPath)
    axios.get(`${serverURL}/upload`, {
        params: {
            foldPath: foldPath
        }
    })
        .then((response) => {
            console.log(response.data, "upload success!")
        })
        .catch((err) => {
            console.log(err)
        })
}

function uploadAFile(filePath, relative) {
    var localFile = fs.createReadStream(filePath)
    var formData = new FormData();
    formData.append('file', localFile);
    var headers = formData.getHeaders();
    formData.getLength(async function (err, length) {
        if (err) {
            return;
        }
        headers['content-length'] = length;
        await axios.post(`${serverURL}/upload?relative=${relative}`, formData, { headers })
            .then(result => {
                console.log(result.data, "upload success")
                main_process_utils.updateTask('Upload file', 1)
            }).catch(res => {
                console.log(res.data);
            })
    })
}

function downloadHandler() {
    console.log("down load from server called")
    axios.get(`${serverURL}/download`)
        .then((response) => {
            console.log("down load success")
            let newFileInfo = genFileInfo(response.data["RelativePath"])
            main_process_utils.diffFileInfo(newFileInfo)
        })
        .catch((err) => {
            console.log(err)
        })
}

function syncFileHandler() {
    console.log("sync file called")
}

function genFileInfo(relativePath) {
    let fileInfo = {
        noteBookNames: [],
        fileNames: []
    }
    relativePath.forEach(item => {
        if (!fileInfo.noteBookNames.includes(item.split('/')[1])) {
            fileInfo.noteBookNames.push(item.split('/')[1])
            let tmp = { names: [] }
            fileInfo.fileNames.push({ ...tmp })
        }
    })
    relativePath.forEach(item => {
        let fold_i = fileInfo.noteBookNames.indexOf(item.split('/')[1])
        fileInfo.fileNames[fold_i].names.push(item.split('/')[2])
    })
    return fileInfo
}
exports.connectSever = connectSever
exports.uploadHandler = uploadHandler
exports.downloadHandler = downloadHandler
exports.syncFileHandler = syncFileHandler