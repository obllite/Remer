import store from '../store/store'
const itemHandler = [searchItemHandler, reviewItemHandler, bookItemHandler, configItemHandler]

function searchItemHandler() {
    store.dispatch({
        type: "showSearchBar",
    })
}
function reviewItemHandler() {
    console.log("review item is clicked")
}
function bookItemHandler() {
    console.log("book item is clicked")
}
function configItemHandler() {
    console.log("config item is clicked")
}

export default itemHandler