import isElectron from 'is-electron';

/* HOOK 更换用户头像 参数void 返回值void */
function changeAvator() {
    if (isElectron()) {
        //console.log(window.ipcRenderer);
        /*         window.ipcRenderer.on('pong', (event, arg) => {
                    this.setState({ ipc: true })
                }) */
        window.ipcRenderer.on('changeAvatorFile-reply', (event, arg) => {
            let myNotification = new Notification('更换头像提示', {
                body: arg
            })
            myNotification.onclick = () => {
                console.log('通知被点击')
            }
        })
        console.log(window.ipcRenderer.send('changeAvatorFile-send', 'changeAvatorFile'))
    }
}
export default changeAvator