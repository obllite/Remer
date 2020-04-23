import React, { useState, createRef } from 'react';
import classnames from 'classnames';
//COMPONENT 单词显示框
//PARAMS wordSet {english,pronunciation ,speech, chinese }
//TODO 完成Worditem 组件样式

function Worditem(props) {
    let {
        wordSet,
        index,
        dragitem,
        itemDragStart,
        itemDragEnd
    } = props
    const worditem = classnames('worditem')
    const dragicon = classnames('dragicon')

    const [draggable, setdraggable] = useState(false)

    const selfRef = createRef()

    const allowDrag = () => {
        console.log('allow is called')
        setdraggable(true)
    }
    const forbidDrag = () => {
        console.log('forbid is called')
        setdraggable(false)
    }
    return (
        <div 
            className={worditem}
            ref={selfRef}
            draggable = {draggable}
            onDragStart={itemDragStart}
            onDragEnd={itemDragEnd}
            data-id={index}
            data-item={JSON.stringify(wordSet)}   
        >
            <div>
                {wordSet.english}
            </div>
            <div>
                {wordSet.pronunciation}
                {wordSet.speech}
                {wordSet.chinese}
            </div>
            <div className={dragicon}
                onMouseDown={allowDrag}
                onMouseUp={forbidDrag}
            >
                {/* NOTE 拖拽按钮占位 */}
            </div>
        </div>
    )
}

export default Worditem