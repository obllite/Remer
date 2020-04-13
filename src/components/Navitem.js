import React, { useState } from 'react'
import "../css/Navitem.scss"
/* COMPONENT  导航栏选项组件*/
/* TODO 考虑用 HOC 或 Hooks 需考虑复用，再根据 params 在父组件中循环渲染出来*/
/* PARAMS 搜 索、复 习、单词本、设 置*/
/* TODO 此处参数应由父组件传入，最终应修改 */
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
            <div key={index} className={itemClass}>
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