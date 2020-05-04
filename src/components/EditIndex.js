import React, { useState } from 'react'
import classnames from 'classnames';
import WordBlock from './WordBlock'
//COMPONENT 创建，打开，编辑 notebook 文件的组件
const maxlength = 25;
function EditIndex() {
    const editIndex = classnames('editIndex')
    const addBlock = classnames('addBlock')
    const addBlockContainer = classnames('addBlockContainer')
    const submitEdit = classnames('submitEdit')
    const submitEditContainer = classnames('submitEditContainer')
    const bottomBtn = classnames('bottomBtn')
    const dividingLine = classnames('dividingLine')
    let blockStatesTmp = [false, false, false]

    const [count, setcount] = useState([1])
    const [blockStates, setblockStates] = useState(blockStatesTmp)

    const handleAddBlock = () => {
        if (count.length === maxlength) {
            console.log('is max!');
            return;
        }
        setcount([...count, count[count.length - 1] + 1])
    }
    const handleSubmitEdit = () => {
        console.log('Submit Edit');
    }
    let wordblock = count.map((item, index) => {
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
            <div className={bottomBtn}>
                <div className={dividingLine}><hr/></div>
                <div className={addBlockContainer}>
                    <div
                        className={addBlock}
                        onClick={handleAddBlock}
                    >
                        +
                    </div>
                </div>
                <div className={submitEditContainer}>
                    <div
                        className={submitEdit}
                        onClick={handleSubmitEdit}
                    >
                        ↑
                    </div>
                </div>
                <div className={dividingLine}><hr/></div>
            </div>

        </div>
    )
}

export default EditIndex