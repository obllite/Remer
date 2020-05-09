const fs = require('fs')
const path = require('path')
const template = require('./template')
const rootPath = path.join(__dirname, "../noteBooks")
//consts
let index = 0;
let fold_index = -1
let fileViewInfo = {
    noteBookNames: [],
    fileNames: [{
        names: []
    }]
}

//functions
//init file info
function initFileViewInfo() {
    console.log('getFileViewInfo')
    dirTree(rootPath, () => {
        fold_index = -1
    })
}
/* PARAMS
    let fileViewInfo = {
    noteBookNames:[],
    fileNames:[{
        names:[]
    }]
}
*/

async function dirTree(pathParams, callback) {
    //深度优先搜索
    if (!fs.statSync(pathParams).isFile()) {
        //index === 0 时为根目录
        if (!fileViewInfo.noteBookNames.includes(getName(pathParams)) && index !== 0) {
            fold_index++
            fileViewInfo.noteBookNames.push(getName(pathParams))
            fileViewInfo.fileNames[fold_index] = { names: [] }
        }
        let dirList = fs.readdirSync(pathParams);
        index++;
        for (let i = 0; i < dirList.length; i++) {
            dirTree(path.join(pathParams, dirList[i]));
        }
        index--;
    } else {
        if (index !== 0 && index !== 1) {
            fileViewInfo.fileNames[fold_index].names.push(getName(pathParams))
        }
    }
    if(callback !== undefined) {
        console.log('noteBookNames is ',fileViewInfo.noteBookNames)
        console.log('fileNames is ',fileViewInfo.fileNames)
        callback()
    }
}

// 新建文件
function newFile(fileInfo) {
    let filePath = path.join(rootPath, fileInfo.path)
    console.log('file path is ', filePath)
    //console.log('file name is ', fileName);
    if (fs.existsSync(filePath)) {
        console.log('file is exist!')
        return false
    } else {
        fs.openSync(filePath, 'w')
        fs.writeFile(filePath, template.notebook_initTemplate, function (err) {
            if (err) {
                return console.log(err);
            }
        });
        console.log('create file success, file path is ', filePath)
        updateFileInfo(filePath)
        return true
    }

}
//更新文件信息
function updateFileInfo(filePath) {
    let foldName = filePath.split(path.sep)
    let fileName = foldName[foldName.length - 1]
    foldName = foldName[foldName.length - 2]
    fold_index = fileViewInfo.noteBookNames.indexOf(foldName)
    fileViewInfo.fileNames[fold_index].names.push(fileName)
    console.log('new file info is', fileViewInfo.fileNames)
}
function getName(pathParams) {
    return path.parse(pathParams).base;
}

//组合文件路径
function combinePath(foldName, fileName) {
    let fold_index = fileViewInfo.noteBookNames.indexOf(foldName)
    if(fold_index !== -1 ){
        if(fileViewInfo.fileNames[fold_index].names.includes(fileName)) {
            return path.resolve(rootPath,foldName,fileName)
        } else {
            return false
        }
    } else {
        return false
    }
}
function readNoteBookFile(filePath,filedata,event,callback) {
    console.log('cache path is', filePath)
    fs.readFile(filePath,(err,data)=>{
        if(err) {
            throw err
        }
        filedata = data
        callback(event,filedata)
    }) 
}
//consts
exports.fileViewInfo = fileViewInfo
//functions
exports.newFile = newFile
exports.initFileViewInfo = initFileViewInfo
exports.readNoteBookFile = readNoteBookFile