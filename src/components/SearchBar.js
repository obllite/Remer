/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../css/SearchBar.scss';                                                   
/* COMPONENT 搜索框组件 */
function SearchBar(props) {
    const [searchBar, setSearchBar] = useState("searchBar")
    const [searchInput, setSearchInput] = useState("searchInput")
    const [searchIcon, setSearchIcon] = useState("iconfont icon-search")
    const [inputValue, setInputValue] = useState("search!")
    function handleInput(e) {
        setInputValue(e.target.value)
        console.log("is changed");
    }
    return (
        <div className={searchBar}>
            <input className={searchInput} type="text" value={inputValue} onChange={handleInput}/>
            <div className={searchIcon}></div>
        </div>
    )
}

export default SearchBar