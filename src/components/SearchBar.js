/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import store from '../store/store'
import searchHandler from '../utils/searchHandler'
/* import '../css/SearchBar.scss';  */
/* COMPONENT 搜索框组件 */
function SearchBar(props) {
    const [searchBar, setSearchBar] = useState("searchBar")
    const [searchInput, setSearchInput] = useState("searchInput")
    const [searchIcon, setSearchIcon] = useState("iconfont icon-search search-icon")
    const [inputValue, setInputValue] = useState("Search!")
    const inputEl = useRef(null)
    const handleBlur = () => {
        if (props.ifInputFocus && inputEl.current.value === "") {
            store.dispatch({
                type: "hideSearchBar",
            })
        }
    }

    //NOTE 此处要考虑前端的节流
    const handleSearch = (e) => {
        if (e.keyCode === 13) {
            //调用search handler 来处理事件
            searchHandler(inputEl.current.value)
        }
    }
    return props.ifSearchBarDisplay ? (
        <div className={searchBar}>
            <input
                className={searchInput}
                type="text"
                placeholder={inputValue}
                onBlur={handleBlur}
                ref={inputEl}
                onKeyDown={(e) => { handleSearch(e) }}
            />
            <div className={searchIcon}>
            </div>
        </div>
    ) : null
}
const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps, null)(SearchBar)