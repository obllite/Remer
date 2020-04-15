const initState = {
    ifSearchBarDisplay: false,
    ifInputFocus: false
}
function reducer(state = initState, action) {
    switch (action.type) {
        case "showSearchBar":
            return {
                ifSearchBarDisplay: true,
                ifInputFocus: true
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
export default reducer