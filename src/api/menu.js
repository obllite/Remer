//NOTE 此处不能在主进程中返回消息，原因未知。electron实际实现时会多次调用reply方法，最终导致爆栈
//NOTE 暂时方案 在 menu 的 click 回调中发送消息

const remote = window.require("electron").remote;
const { Menu } = remote;


const newCxtMenu = (config) => {
    if(config) {
        const contextMenu = Menu.buildFromTemplate(config)
        return contextMenu
    }
    console.log("menu config cannot be empty")
}
export default newCxtMenu