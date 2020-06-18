import isElectron from 'is-electron';
import notifier from './notifier'
/* HOOK 新建fold, 参数 foldname, fold path */
export const handleNewFold = (foldInfo) => {
    if(isElectron()) {
        window.ipcRenderer.on('newFold-reply', (event, ifNewFoldSuc)=>{
            if(ifNewFoldSuc) {
                notifier({
                    head: 'new Fold suc', 
                    body: 'new Fold suc',
                    callback: ()=>{
                        console.log('通知被点击')
                    }
                })
            }
        })
        window.ipcRenderer.send('newFold-send', foldInfo)
    }
}
/* HOOK 新建notebook 下的文件 参数filename  */
const handleNewFile = (fileName, filePath) => {
    let fileInfo = {
        path: filePath,
        name: fileName
    }
    if (isElectron()) {
        window.ipcRenderer.on('newFile-reply', (event, ifNewFileSuc) => {
            if (ifNewFileSuc) {
                notifier({
                    head: '创建文件成功', 
                    body: 'new file suc!',
                    callback: ()=>{
                        console.log('通知被点击')
                    }
                })
            } else {
                notifier({
                    head: '创建文件失败', 
                    body: 'new file failed!',
                    callback: ()=>{
                        console.log('通知被点击')
                    }
                })
            }
        })
    }
    window.ipcRenderer.send('newFile-send', fileInfo);
}

export const validateFileName = (fileName, filelist) => {
    let fileNameReg = /^(.*)?\.json$/
    let match = fileNameReg.exec(fileName)
    if (match === null) {
        return false
    }
    return !filelist.includes(fileName)
}

export const validateFoldName = (foldName, foldNames) => {
    return !foldName.includes(foldName)
}
export default handleNewFile