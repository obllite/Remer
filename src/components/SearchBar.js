/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../css/SearchBar.scss';
/* COMPONENT 搜索框组件 */
/* TODO 搜索框样式实现 */
/* TODO 搜索功能实现 */
/* TODO 搜索框获取焦点事件状态管理 */
function SearchBar(props) {
    const [searchBar, setSearchBar] = useState("searchBar")
    const [searchInput, setSearchInput] = useState("searchInput")
    const [searchIcon, setSearchIcon] = useState("iconfont icon-search")
    const inputValue = "this is search"
    return (
        <div className={searchBar}>
            <div className={searchIcon}></div>
            <input className={searchInput} type="text" value={inputValue} />
        </div>
    )
}

export default SearchBar