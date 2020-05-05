const fs = require('fs')
const path = require('path')
//FUNCTION 保存edit block data 部分
async function saveEditBlocks(blocksData) {
    fs.openSync(path.join(__dirname, "../noteBooks/editBlockCache.json"),"w")
    fs.writeFile(path.join(__dirname, "../noteBooks/editBlockCache.json"),blocksData,(err)=>{
        if(err) {
            throw err;
        }
    })
}

exports.saveEditBlocks = saveEditBlocks;