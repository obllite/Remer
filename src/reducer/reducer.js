const initState = {
    ifSearchBarDisplay: false,
    ifInputFocus: false
}
function reducer(state = initState, action) {
    switch (action.type) {
        /* 控制searchBar显示 */
        /* PARAMS showSearchBar navItemHandler.js */
        case "showSearchBar":
            return {
                ifSearchBarDisplay: !state.ifSearchBarDisplay,
                ifInputFocus: !state.ifInputFocus
            }
        /* PARAMS hideSearchbar SearchBar.js */
        case "hideSearchBar":
            return {
                ifSearchBarDisplay: false,
                ifInputFocus: false
            }
        default:
            return state
    }
}
export default reducer