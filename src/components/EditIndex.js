import React, { useState } from 'react'
import classnames from 'classnames';
import WordBlock from './WordBlock'
//COMPONENT 创建，打开，编辑 notebook 文件的组件
//TODO 添加 word block
function EditIndex() {
    const editIndex = classnames('editIndex')
    const data = [1]
    let blockStatesTmp = [false,false,false]
    const [blockStates, setblockStates] = useState(blockStatesTmp)
    let wordblock = data.map((item, index) => {
        return (
            <WordBlock
                index={index}
                key={index}
                blockStates={blockStates}
                setblockStates={setblockStates}
            >
            </WordBlock>
        )
    })
    return (
        <div
            className={editIndex}
        >
                {wordblock}
        </div>
    )
}

export default EditIndex