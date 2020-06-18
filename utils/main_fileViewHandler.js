const fs = require('fs')
const path = require('path')
const template = require('./template')
const rootPath = path.join(__dirname, "../noteBooks")
//consts
let index = 0;
let foldIndex = -1
let fileViewInfo = {
    noteBookNames: [],
    fileNames: [{
        names: []
    }]
}

//functions
//init file info
function initFileViewInfo() {
    //console.log('getFileViewInfo')
    dirTree(rootPath, () => {
        foldIndex = -1
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
            foldIndex++
            fileViewInfo.noteBookNames.push(getName(pathParams))
            fileViewInfo.fileNames[foldIndex] = { names: [] }
        }
        let dirList = fs.readdirSync(pathParams);
        index++;
        for (let i = 0; i < dirList.length; i++) {
            dirTree(path.join(pathParams, dirList[i]));
        }
        index--;
    } else {
        if (index !== 0 && index !== 1) {
            fileViewInfo.fileNames[foldIndex].names.push(getName(pathParams))
        }
    }
    if (callback !== undefined) {
        //console.log('noteBookNames is ',fileViewInfo.noteBookNames)
        //console.log('fileNames is ',fileViewInfo.fileNames)
        callback()
    }
}
// 新建文件夹
function newFold(newFoldPath, foldInfo) {
    // 新建fold
    fs.mkdir(newFoldPath, (err) => {
        if (err) {
            throw err
        }
        console.log("fold new suc!")
    })
    //更新 file view info
    fileViewInfo.noteBookNames.splice(foldInfo.index, 0, foldInfo.name)
    fileViewInfo.fileNames.splice(foldInfo.index, 0, { names: [] })
    // 初始化untitled file
    foldInfo.fileconfig.names.forEach((element, index) => {
        console.log('element is', element, index)
        let path = '/' + foldInfo.name + '/' + element
        let fileInfo = {
            path: path,
            name: foldInfo.fileconfig.names[index]
        }
        //再新建文件
        newFile(fileInfo)
    });

    console.log(fileViewInfo.fileNames[0])
    console.log(fileViewInfo.fileNames[1])
    console.log(fileViewInfo.fileNames[2])
}

// 新建文件
function newFile(fileInfo) {
    console.log('new file is ', fileInfo)
    let filePath = path.join(rootPath, fileInfo.path)
    //console.log('file path is ', filePath)
    //console.log('file name is ', fileName);
    if (fs.existsSync(filePath)) {
        // console.log('file is exist!')
        return false
    } else {
        fs.openSync(filePath, 'w')
        fs.writeFile(filePath, template.notebook_initTemplate, function (err) {
            if (err) {
                throw err
            }
        });
        console.log('create file success, file path is ', filePath)
        updateFileInfo('new', filePath)
        return true
    }

}
//更新文件信息
function updateFileInfo(type, oldPath, newPath) {
    let oldBaseInfo = oldPath.split(path.sep)
    let foldName = oldBaseInfo[oldBaseInfo.length - 2]
    let fileName = oldBaseInfo[oldBaseInfo.length - 1]
    let fold_index = fileViewInfo.noteBookNames.indexOf(foldName)
    let file_index = fileViewInfo.fileNames[fold_index].names.indexOf(fileName)
    switch (type) {
        case 'new':
            fileViewInfo.fileNames[fold_index].names.push(fileName)
            break;
        case 'delete':
            fileViewInfo.fileNames[fold_index].names.splice(file_index, 1)
            break;
        case 'rename':
            let newBaseInfo = newPath.split(path.sep)
            let newFileName = newBaseInfo[newBaseInfo.length - 1]
            fileViewInfo.fileNames[fold_index].names[file_index] = newFileName
            break;
        default:
            break;
    }

    //console.log('new file info is', fileViewInfo.fileNames)
}
function getName(pathParams) {
    return path.parse(pathParams).base;
}

//组合文件路径
function combinePath(foldName, fileName) {
    let fold_index = fileViewInfo.noteBookNames.indexOf(foldName)
    if (fold_index !== -1) {
        if (fileViewInfo.fileNames[fold_index].names.includes(fileName)) {
            return path.resolve(rootPath, foldName, fileName)
        } else {
            return false
        }
    } else {
        return false
    }
}

//获取第一个 noteBook 中第一个 file 的路径
function getDefaultFilePath() {
    let defaultPath = '/noteBooks/' + fileViewInfo.noteBookNames[0] + '/' + fileViewInfo.fileNames[0].names[0]
    return defaultPath
}

//读noteBook 文件
function readNoteBookFile(filePath, filedata, event, callback) {
    console.log('load notbook file path is', filePath)
    fs.readFile(filePath, (err, data) => {
        if (err) {
            throw err
        }
        filedata = data
        callback(event, filedata)
    })
}
// 重命名 file
function rename(oldPath, newPath, callback) {
    console.log('rename file path is ', oldPath)
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            throw err
        }
        updateFileInfo('rename', oldPath, newPath)
        callback()
    })
}

function deletefile(filePath, callback) {
    filePath = path.join(rootPath, filePath)
    console.log('delete file path is ', filePath)
    fs.unlink(filePath, (err) => {
        if (err) {
            throw err
        }
        updateFileInfo('delete', filePath)
        callback()
    })
}

//NOTE 所有文件信息更改后都应该调用 updateFileInfo 更新文件信息
//NOTE 所有 noteBooks 下path.join 都使用 rootPath
//consts
exports.fileViewInfo = fileViewInfo
//functions
exports.newFold = newFold
exports.newFile = newFile
exports.initFileViewInfo = initFileViewInfo
exports.getDefaultFilePath = getDefaultFilePath
exports.readNoteBookFile = readNoteBookFile
exports.rename = rename
exports.deletefile = deletefile