import React, { useState } from 'react'
/* import "../css/Navitem.scss" */
import itemHandler from "../utils/navItemHandler"
import { Link } from 'react-router-dom'
/* import {browserHistory} from 'react-router' */
/* COMPONENT  导航栏选项组件*/
/* PARAMS 搜 索、复 习、单词本、设 置*/
/* TODO 应该使用 template method pattern itemTitle 应该由父组件传入 */
/* TODO 实现 rooter 切换和 transiform 效果 */

const itemTitle = [
    {
        title: "搜 索",
        iconfont: "iconfont icon-search nav-icon",
    },
    {
        title: "复 习",
        iconfont: "iconfont icon-child nav-icon",
        path: '/index'
    },
    {
        title: "单词本",
        iconfont: "iconfont icon-privacy nav-icon",
        path: '/edit'
    },
    {
        title: "设 置",
        iconfont: "iconfont icon-shezhi nav-icon",
        path: '/config'
    }]

function Navitem(props) {
    const [itemClass, setItemClass] = useState("navItem")
    const items = itemTitle.map((item, index) => {
        if (index === 0) {
            return (
                <div key={index} className={itemClass} onClick={itemHandler[index]}>
                    <div className={item.iconfont}></div>
                </div>
            )
        } else {
            return (
                <div key={index} className={itemClass} onClick={itemHandler[index]}>
                    <Link to={item.path}>
                        <div className={item.iconfont}></div>
                    </Link>
                </div>
            )
        }

    })
    return (
        <>
            {items}
        </>
    )
}

export default Navitem