import isElectron from 'is-electron';
/* HOOK 新建notebook 中的文件 参数filename  */
const handleNewFile = (fileName) => {
    if (isElectron()) {
        window.ipcRenderer.on('newFile-reply', (event,ifNewFileSuc) => {
            console.log('file new result: ',ifNewFileSuc)
        })
    }
    window.ipcRenderer.send('newFile-send', fileName);
    return fileName
}

export const validateFileName = (fileName, filelist) => {
    let fileNameReg = /^(.*)?\.json$/
    let match =  fileNameReg.exec(fileName)
    if(match === null) {
        return false
    }
    return !filelist.includes(fileName)
}
export default handleNewFile