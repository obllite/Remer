const fs = require('fs')
const path = require('path')
//FUNCTION 保存edit block data 部分
async function saveEditBlocks(blocksData, currentPath,callback) {
    fs.openSync(path.join(__dirname, "../noteBooks/editBlockCache.json"),"w")
    fs.writeFile(path.join(__dirname, "../noteBooks/editBlockCache.json"),blocksData,(err)=>{
        if(err) {
            throw err;
        }
        callback(currentPath)
    })
}

async function syncCacheToFile(cachePath, filePath){
    console.log('cache path is ',cachePath)
    console.log('sync path is ',filePath)
    fs.copyFile(cachePath,filePath,(err)=>{
        if(err) {
            throw err
        }
    })
}
exports.saveEditBlocks = saveEditBlocks;
exports.syncCacheToFile = syncCacheToFile