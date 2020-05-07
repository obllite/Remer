const fs = require('fs')
const path = require('path')
const template = require('./template')
const rootPath = path.join(__dirname, "../noteBooks")
let index = 0;
function newFile(fileInfo) {
    let fileName = fileInfo.name
    let filePath = path.join(rootPath, fileInfo.path)
    console.log('file path is ', filePath)
    console.log('file name is ', fileName);
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
        return true
    }
}



async function dirTree(pathParams) {
    //深度优先搜索
    if (!fs.statSync(pathParams).isFile()) {
        console.log(markT(index), getName(pathParams))
        let dirLis = fs.readdirSync(pathParams);
        index++;
        for (let i = 0; i < dirLis.length; i++) {
            dirTree(path.join(pathParams, dirLis[i]));
        }
        index--;
    } else {
        console.log(markT(index), getName(pathParams))
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
exports.newFile = newFile