import isElectron from 'is-electron';

/* HOOK 保存编辑区域的数据，参数 编辑区word block 中的数据,包括 english、chinese、 meanings、setCollection */
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


