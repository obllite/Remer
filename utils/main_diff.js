const main_process_utils = require('./index')
const path = require('path')
const fs = require('fs')
// diff 返回结构
/* 
{
    tag: string
    indices: [] //从顶层到此层的index数组
    type: add, delete, update, none
}
*/

// TODO 实现fileinfo 的diff 以及 fileNode 的diff
async function diffFileInfo(newFileInfo, data) {
    let oldFileInfo = main_process_utils.fileViewInfo
    let oldPathes = generatePath(oldFileInfo)
    let newPathes = generatePath(newFileInfo)
    newPathes.forEach((item, index) => {
        if (!oldPathes.includes(item)) {
            dispatch(item)
                .then((res) => {
                    console.log("file info is", res.names, "item is", item)
                    let tmp = item.split('/')
                    tmp.shift()
                    console.log(tmp)
                    // 不是第一个不存在的file
                    if(res.names.indexOf(res[1]) === -1) {
                        main_process_utils.newFile({
                            path: item,
                            name: tmp[1]
                        }).then((res)=>{
                            let writePath = path.join(__dirname, "../noteBooks" + item)
                            console.log("write path is",writePath)
                            console.log("file data is", data.FileData[data["RelativePath"].indexOf(item)])
                            fs.truncateSync(writePath, 0)
                            fs.writeFile(writePath, data.FileData[data["RelativePath"].indexOf(item)], err=>{
                                if(err) {
                                    console.log(err)
                                } else {
                                    console.log("write download file success")
                                }
                            })
                        })
                    }
                })
                .catch(err => { console.log(err) })
                //console.log(data.FileData[1])
        }
    })
}


function generatePath(fileInfo) {
    let pathes = []
    fileInfo.noteBookNames.forEach((fold, index) => {
        fileInfo.fileNames[index].names.forEach(file => {
            let path = "/" + fold + "/"
            path += file
            pathes.push(path)
        })
    })
    return pathes
}

async function dispatch(newNode) {
    newNode = newNode.split('/')
    newNode.shift()
    // 判断文件夹是否已经存在
    let foldIndex = main_process_utils.fileViewInfo.noteBookNames.indexOf(newNode[0])
    //console.log("if exist fold", foldIndex)
    if (foldIndex === -1) {
        let name = newNode[1]
        let foldConfig = {
            name: newNode[0],
            path: "/" + newNode[0],
            fileconfig: { names: [name] },
            index: main_process_utils.fileViewInfo.noteBookNames.length
        }
        // 由于要新建第一个 fold 所以需要 await, 后续新建fold 下文件, 则不需要 await
        await main_process_utils.newFold(path.join(__dirname, "../noteBooks/" + newNode[0]), foldConfig)
        foldIndex = foldConfig.index
    }
    // 文件夹存在, 则检查文件是否存在
    // 写入文件
    let fileInfo = main_process_utils.fileViewInfo.fileNames[foldIndex]
    return fileInfo
}
exports.diffFileInfo = diffFileInfo