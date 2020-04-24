const initState = {
    ifSearchBarDisplay: false,
    ifInputFocus: false,
    wordContent: ''
}
function reducer(state = initState, action) {
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
        case "wordContent":
            return {
                wordContent: 'wordContent'
            }
        default:
            return state
    }
}
export default reducer