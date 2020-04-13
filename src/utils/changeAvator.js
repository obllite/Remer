import isElectron from 'is-electron';

/* FUNCTION 更换用户头像 参数void 返回值void */
function changeAvator() {
    if (isElectron()) {
        //console.log(window.ipcRenderer);
/*         window.ipcRenderer.on('pong', (event, arg) => {
            this.setState({ ipc: true })
        }) */
        window.ipcRenderer.on('changeAvatorFile-reply', (event, arg) => {
            console.log(arg)
        })
        console.log(window.ipcRenderer.send('changeAvatorFile-send','changeAvatorFile'))
    }
}
export default changeAvator