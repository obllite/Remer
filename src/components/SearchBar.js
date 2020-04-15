/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import store from '../store/store'
import '../css/SearchBar.scss';                                                   
/* COMPONENT 搜索框组件 */
function SearchBar(props) {
    const [searchBar, setSearchBar] = useState("searchBar")
    const [searchInput, setSearchInput] = useState("searchInput")
    const [searchIcon, setSearchIcon] = useState("iconfont icon-search")
    const [inputValue, setInputValue] = useState("search!")
    const inputEl = useRef(null)
    const handleBlur = () => {
        if (props.ifInputFocus && inputEl.current.value === "") {
            store.dispatch({
                type:"hideSearchBar",
            })
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
            />
            <div className={searchIcon}>
            </div>
        </div>
    ) : null
}
const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps,null)(SearchBar)