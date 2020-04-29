import React, { useState } from 'react'
import classnames from 'classnames';
import WordBlock from './WordBlock'
//COMPONENT 创建，打开，编辑 notebook 文件的组件

function EditIndex() {
    const editIndex = classnames('editIndex')
    let blocks = [false,false,false]

    
    let wordblock = blocks.map((item, index) => {
        return (
            <WordBlock
                index={index}
                key={index}
                ifShowDetail={item}
            >
            </WordBlock>
        )
    })
    return (
        <div
            className={editIndex}
        >
            asdfasdf
            {wordblock}
        </div>
    )
}
export default EditIndex