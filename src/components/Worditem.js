import React, { useState, createRef } from 'react';
import classnames from 'classnames';
//COMPONENT 单词显示框
//PARAMS wordSet {english,pronunciation ,speech, chinese }
//TODO 完成Worditem 组件样式

function Worditem(props) {
    let {
        wordSet,
        index,
        dragEl
    } = props
    const worditem = classnames('worditem')
    const dragicon = classnames('dragicon')

    const [draggable, setdraggable] = useState(false)

    const selfRef = createRef()

    const allowDrag = () => {
        setdraggable(true)
    }
    const forbidDrag = () => {
        setdraggable(false)
    }
    const dragStart = () => {
        dragEl = selfRef
        console.log(dragEl)
    }
    const dragEnter = () => {
        if (dragEl !== selfRef) {
            insertBefore()
        }
    }
    const dragLeave = () => {
        if (dragEl !== selfRef) {
            if (selfRef === ) {
                
            }
        }
    }
    const insertBefore = () => {
        console.log("insert before is called");
    }
    return (
        <div className={worditem}
        ref={selfRef}
        draggable = {draggable}
        onDragStart={dragStart}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
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