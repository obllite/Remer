import isElectron from 'is-electron';
import store from '../store/store'
import emitter from './events';

/* HOOK 搜素单词word 返回值void */
let loading_type = "loading_circle"
function searchHandler(word) {
    console.log('in search handler search word is ', word)
    if(isElectron()) {
        //发送正在加载的消息
        emitter.emit('wrdetailoading-emit',loading_type);
        window.ipcRenderer.on('searchWord-reply',(event,wordContent)=>{ 
            content = wordContent
            store.dispatch({
                type: "wordContent",
                wordContent: ''
            })
        //发送加载完成的消息
        emitter.emit('wrdetailoaded-emit')
        })
    }
    window.ipcRenderer.send('searchWord-send', word);
}

let content = 'init'
export const getContent = () => {
    return content
}
export default searchHandler