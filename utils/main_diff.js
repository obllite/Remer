const main_process_utils = require('./index')

function diffFileInfo(newFileInfo) {
    console.log("old file info is ",main_process_utils.fileViewInfo)
    console.log("new file info is", newFileInfo.noteBookNames)
    newFileInfo.fileNames.forEach((item, index)=>{
        console.log('new file is', item.names)
    })

    // 简易的 diff 算法, 找出需要更新的节点
    

}

exports.diffFileInfo = diffFileInfo