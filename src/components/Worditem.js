import React, { useState, createRef } from 'react';
import classnames from 'classnames';

//COMPONENT 单词显示框
//PARAMS wordSet {english,pronunciation ,speech, chinese }
//TODO 完成Worditem 组件样式

function Worditem(props) {
    let {
        wordSet,
        index,
        itemDragStart,
        itemDragEnd,
    } = props
    //state
    const [draggable, setdraggable] = useState(false)
    const [ifCollected, setifCollected] = useState(false)
    const [ifDisplay, setifDisplay] = useState(false)
    const selfRef = createRef()
    //classnames
    const worditem = classnames('worditem')
    const dragTag = classnames('dragTag')
    const staricon = classnames({
        'iconfont': true,
        'icon-collection': !ifCollected,
        'icon-collection-fill': ifCollected
    })
    const collecticon = classnames({
        'iconfont': true,
        'icon-Notvisible': !ifDisplay,
        'icon-browse': ifDisplay
    })
    //function
    const allowDrag = (e) => {
        setdraggable(true)
    }
    const forbidDrag = (e) => {
        setdraggable(false)
    }
    const ifcollectWords = () => {
        setifCollected(!ifCollected)
        wordSet.ifCollected = !wordSet.ifCollected
    }
    const changeDisplay = (e) => {
        e.preventDefault();
        setifDisplay(!ifDisplay)
    }

    return (
        <div
            className={worditem}
            ref={selfRef}
            draggable={draggable}
            onDragStart={itemDragStart}
            onDragEnd={itemDragEnd}
            data-id={index}
            data-item={JSON.stringify(wordSet)}
        >
            <div>
                {wordSet.english}
            </div>
            <div
                className={staricon}
                onClick={ifcollectWords}
            >

            </div>
            <div
                className={dragTag}
                onMouseDown={(e)=>{allowDrag(e)}}
                onMouseUp={(e)=>{forbidDrag(e)}}
            >
            </div>
            <div
                style={{ visibility: ifDisplay ? "visible":"hidden" }}
            >
                {wordSet.speech}
                {wordSet.chinese}
            </div>
            <div
                className={collecticon}
                onMouseDown={(e)=>{changeDisplay(e)}}
                onMouseUp={(e)=>{changeDisplay(e)}}
            >
            </div>
        </div>
    )
}

export default Worditem