import isElectron from 'is-electron';
import store from '../store/store'
/* HOOK 搜素单词word 返回值void */
function searchHandler(word) {
    console.log('word is ', word)
    if(isElectron()) {
        window.ipcRenderer.on('searchWord-reply',(event,wordContent)=>{
            //console.log('content is ', wordContent);
            store.dispatch({
                type: "wordContent",
                wordContent: wordContent
            })
        })
    }
    window.ipcRenderer.send('searchWord-send', word);
    console.log("search handler called");
}
export default searchHandler