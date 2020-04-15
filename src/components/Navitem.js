import React, { useState } from 'react'
import "../css/Navitem.scss"
import itemHandler from "../utils/navItemHandler"
/* COMPONENT  导航栏选项组件*/
/* PARAMS 搜 索、复 习、单词本、设 置*/
/* FIXME 此处参数应由父组件传入，最终应修改 */
/* TODO 为第一个search item子组件自动获取焦点，失去焦点时 search item 组件消失 */
/* TODO 为后三个item子组件加入点击事件，实现 rooter 切换和 transiform 效果 */

const itemTitle = [
    {
        title: "搜 索",
        iconfont: "iconfont icon-search"
    },
    {
        title: "复 习",
        iconfont: "iconfont icon-child"
    },
    {
        title: "单词本",
        iconfont: "iconfont icon-privacy"
    },
    {
        title: "设 置",
        iconfont: "iconfont icon-shezhi"
    }]

function Navitem(props) {
    const [itemClass, setItemClass] = useState("navItem")
    const items = itemTitle.map((item, index) => {
        return (
            <div key={index} className={itemClass} onClick={itemHandler[index]}>
                <div className={item.iconfont}></div>
                {item.title}
            </div>
        )
    })
    return (
        <>
            {items}
        </>
    )
}

export default Navitem