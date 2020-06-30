import isElectron from 'is-electron';
import store from '../store/store'

/* HOOK 搜素单词word 返回值void */
function searchHandler(word) {
    console.log('in search handler search word is ', word)
    if(isElectron()) {
        window.ipcRenderer.on('searchWord-reply',(event,wordContent)=>{ 
            content = wordContent
            store.dispatch({
                type: "wordContent",
                wordContent: ''
            })
            // todo 清除动画
        })
    }
    // todo emitter 显示动画
    window.ipcRenderer.send('searchWord-send', word);
}

let content = 'init'
export const getContent = () => {
    return content
}
export default searchHandler