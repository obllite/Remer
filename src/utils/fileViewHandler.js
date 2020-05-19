import isElectron from 'is-electron';
/* HOOK 新建notebook 下的文件 参数filename  */
const handleNewFile = (fileName, filePath) => {
    let fileInfo = {
        path: filePath,
        name: fileName
    }
    if (isElectron()) {
        window.ipcRenderer.on('newFile-reply', (event, ifNewFileSuc) => {
            if (ifNewFileSuc) {
                let sucNotification = new Notification('创建文件成功', {
                    body: '文件创建成功'
                })
                sucNotification.onclick = () => {
                    console.log('通知被点击')
                }
            } else {
                let myNotification = new Notification('创建文件警告', {
                    body: '文件创建失败'
                })
                myNotification.onclick = () => {
                    console.log('通知被点击')
                }
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

export default handleNewFile