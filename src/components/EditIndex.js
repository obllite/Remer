import React, { useState } from 'react'
import classnames from 'classnames';
import WordBlock from './WordBlock'
import EditDataCtx from './EditDataCtx'

import saveEditBlocks from '../utils/saveEditBlocks'
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
    //consts
    let blockStatesTmp = [false, false, false]
    let blocksData = []
    let updateData = (index, english, chinese, meanings) => {
        blocksData[index] = {
            english: english,
            chinese: chinese,
            meanings: meanings
        }
    }
    //hooks
    const [count, setcount] = useState([1])
    const [blockStates, setblockStates] = useState(blockStatesTmp)
    //handlers
    const handleAddBlock = () => {
        if (count.length === maxlength) {
            console.log('is max!');
            return;
        }
        setcount([...count, count[count.length - 1] + 1])
    }
    //在此处保存暂存的blockJsonSets
    const handleSubmitEdit = () => {
        saveEditBlocks(blocksData)
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
        <EditDataCtx.Provider value={{ updateData }}>
            <div
                className={editIndex}
            >
                {wordblock}
                <div className={bottomBtn}>
                    <div className={dividingLine}><hr /></div>
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
                    <div className={dividingLine}><hr /></div>
                </div>
            </div>
        </EditDataCtx.Provider>
    )
}

export default EditIndex
