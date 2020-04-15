/* TODO 不符合设计模式，应该重构为高级函数，根据参数返回函数并 push 到itemHandler数组中，可分为函数名拼接 和匿名函数创建，参数为全局变量 */
import store from '../store/store'
const itemHandler = [searchItemHandler, reviewItemHandler, bookItemHandler, configItemHandler]
function searchItemHandler() {
    console.log("search item is clicked")
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