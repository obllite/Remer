import isElectron from 'is-electron';

//TODO 可以使用 diff 算法优化
/* HOOK 保存编辑区域的数据 */
const saveEditBlocks = (blocksData) => {
    if(isElectron()) {
        //TODO 实现写文件进度条
        window.ipcRenderer.on('saveEditBlocks-reply',(event,num)=>{ 
            console.log('write stream length is ', num)
        })
    }
    window.ipcRenderer.send('saveEditBlocks-send', blocksData);
}
export default saveEditBlocks


