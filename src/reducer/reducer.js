import { combineReducers } from 'redux';
const searchBarInitState = {
    ifSearchBarDisplay: false,
    ifInputFocus: false,
    wordContent:''
}
const getWordInitState = {
    wordContent: ''
}
const searchBarReducer = (state = searchBarInitState, action) => {
    switch (action.type) {
        /* 控制searchBar显示 */
        case "showSearchBar":
            return {
                ifSearchBarDisplay: !state.ifSearchBarDisplay,
                ifInputFocus: !state.ifInputFocus
            }
        case "hideSearchBar":
            return {
                ifSearchBarDisplay: false,
                ifInputFocus: false
            }
        default:
            return state
    }
}

const getWordReducer = (state = getWordInitState, action) => {
    /* 从主进程获得单词信息后返回数据给组件 */
    switch (action.type) {
        case 'resolveWord':
            return {
                wordContent: state.wordContent
            }

        default:
            return state
    }
}
const reducer = (state = searchBarInitState, action) => {

    switch (action.type) {
        /* 控制searchBar显示 */
        case "showSearchBar":
            return {
                ifSearchBarDisplay: !state.ifSearchBarDisplay,
                ifInputFocus: !state.ifInputFocus
            }
        case "hideSearchBar":
            return {
                ifSearchBarDisplay: false,
                ifInputFocus: false
            }
        case 'resolveWord':
            console.log('is in resolve word')
            return {
                wordContent: state.wordContent
            }
        default:
            return state
    }
}
console.log(reducer)
export default reducer