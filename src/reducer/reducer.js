//NOTE 由于combineReducers 使用会导致 action 无法接收，解决后应改为 combineReducers
import { getContent } from '../utils/searchHandler'
const searchBarInitState = {
    ifSearchBarDisplay: false,
    ifInputFocus: false,
    wordContent: '<h1>placeholder template</h1>'
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
        case 'wordContent':
            return {
                ifSearchBarDisplay: false,
                ifInputFocus: false,
                wordContent: state.wordContent += getContent()
            }
        default:
            return state
    }
}
export default reducer