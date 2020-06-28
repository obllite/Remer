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
    console.log(main_process_utils.fileViewInfo)
    main_process_utils.fileViewInfo.noteBookNames.forEach((item, index) => {
        let gpath = generatePath("fold", item)
        uploadFold(gpath)
    })
    main_process_utils.fileViewInfo.fileNames.forEach((fold_item, fold_index)=>{
        fold_item.names.forEach((file_item, file_index)=>{
            let relative = "/" + main_process_utils.fileViewInfo.noteBookNames[fold_index] + "/" +file_item
            let gpath = generatePath("file", relative)
            uploadAFile(gpath, relative)
        })
    })
    //uploadAFile(gpath)
}

function uploadFold(foldPath) {
    console.log('upload fold: ', foldPath)
    axios.get(`${serverURL}/upload`, {
        params: {
            foldPath: foldPath
        }
    })
        .then((response) => {
            console.log(response.data + " upload success!")
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
                console.log("upload success",result.data)
            }).catch(res => {
                console.log(res.data);
            })
    })
}

function downloadHandler() {
    console.log("down load from server called")
}

function syncFileHandler() {
    console.log("sync file called")
}

exports.connectSever = connectSever
exports.uploadHandler = uploadHandler
exports.downloadHandler = downloadHandler
exports.syncFileHandler = syncFileHandler