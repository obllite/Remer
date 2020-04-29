import React, { useState } from 'react'
import classnames from 'classnames';
import WordBlock from './WordBlock'
//COMPONENT 创建，打开，编辑 notebook 文件的组件

function EditIndex() {
    const editIndex = classnames('editIndex')
    let blocks = [{
        ifShowDetail: false
    }, {
        ifShowDetail: false
    }, {
        ifShowDetail: false
    }]

    
    let wordblock = blocks.map((item, index) => {
        return (
            <WordBlock
                index={index}
                key={index}
                ifShowDetail={item.ifShowDetail}
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