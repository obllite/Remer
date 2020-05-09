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
function newFile(fileInfo) {
    let filePath = path.join(rootPath, fileInfo.path)
    //console.log('file path is ', filePath)
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
        console.log('fold index is ', fold_index)
        /* dirTree(rootPath, () => {
            fold_index = -1
        }) */
        return true
    }

}

function getFileViewInfo() {
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
        console.log('out', markT(index), getName(pathParams))
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
        if (index !== 0) {
            fileViewInfo.fileNames[fold_index].names.push(getName(pathParams))
            console.log('in ', markT(index), getName(pathParams))
        }
    }
    if(callback !== undefined) {
        callback()
    }
   
}
function markT(index) {
    if (index === 0) {
        return '你要读取的文件夹：'
    }
    let str = '';
    for (let i = 0; i < index; i++) {
        str += ' |---'
    }
    return str;
}

function getName(pathParams) {
    return path.parse(pathParams).base;
}
//consts
exports.fileViewInfo = fileViewInfo
//functions
exports.newFile = newFile
exports.getFileViewInfo = getFileViewInfo