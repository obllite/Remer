/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import store from '../store/store'
import '../css/SearchBar.scss';                                                   
/* COMPONENT 搜索框组件 */
function SearchBar(props) {
    console.log(props)
    const [searchBar, setSearchBar] = useState("searchBar")
    const [searchInput, setSearchInput] = useState("searchInput")
    const [searchIcon, setSearchIcon] = useState("iconfont icon-search")
    const [inputValue, setInputValue] = useState("search!")
    const handleChnange = (e) => {
        setInputValue(e.target.value)
    }
    const handleBlur = (e) => {
        console.log("失去焦点")
        if (props.ifInputFocus) {
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
                value={inputValue} 
                onChange={handleChnange} 
                onBlur={handleBlur}
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