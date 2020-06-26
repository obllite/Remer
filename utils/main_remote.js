const axios = require('axios');

const serverURL = 'http://localhost:9090'

async function connectSever() {
    const response = await axios.get(`${serverURL}/test`, {});
    console.log(response);
}

function uploadFileHandler() {
    console.log("up load file called")
    
}

function downloadFileHandler() {
    console.log("down load from server called")
}

function syncFileHandler() {
    console.log("sync file called")
}

exports.connectSever = connectSever
exports.uploadFileHandler = uploadFileHandler
exports.downloadFileHandler = downloadFileHandler
exports.syncFileHandler = syncFileHandler