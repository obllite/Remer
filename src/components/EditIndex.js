import React, { useState, useRef, useEffect } from 'react'
import classnames from 'classnames';
import WordBlock from './WordBlock'
import FileView from './FileView'
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
    const editAndPreview = classnames('editAndPreview')
    //consts
    let blockStatesTmp = [false, false, false]
    //blocks data temp 和 blocksData 为同步的两个相同的数据
    //temp 用于存储子组件 effect 中更新， blocksData 用于父组件中更新
    let blocksDataTmp = []
    let updateData = (index, english, chinese, meanings) => {
        blocksDataTmp[index] = {
            english: english,
            chinese: chinese,
            meanings: meanings
        }
    }

    //hooks
    const [blocksData, setblocksData] = useState([])

    const [count, setcount] = useState([1])
    const [blockStates, setblockStates] = useState(blockStatesTmp)
    let toBottom = useRef()
    useEffect(() => {
        scrollToBottom()
    }, [count])
    useEffect(() => {
        let isMounted = true
        /* HOOK 加载cache 中暂存的 edit data*/
        if(window.ipcRenderer) {
            window.ipcRenderer.send('loadEditCache-send', 'loadEditCache')
            window.ipcRenderer.on('loadEditCache-reply', (event, arg) => {
                if (isMounted) {
                    handleLoadData(arg)
                }
            })
        }
        return () => {
            isMounted = false
        }
    }, [])
    //handlers
    const handleLoadData = (cacheData) => {
        let tempArr = []
        for (const key in cacheData) {
            if (cacheData.hasOwnProperty(key)) {
                let index = key.split('#')[1]
                const element = cacheData[key];
                tempArr[index] = element
            }
        }
        setblocksData(tempArr)
    }
    const handleAddBlock = () => {
        if (count.length === maxlength) {
            console.log('is max!');
            return;
        }
        setcount([...count, count[count.length - 1] + 1])
    }
    const scrollToBottom = () => {
        const scrollHeight = toBottom.scrollHeight;
        const height = toBottom.clientHeight;
        const maxScrollTop = scrollHeight - height;
        toBottom.scrollTop = maxScrollTop > 0 ? maxScrollTop + 30 : 0;
    }
    //在此处保存暂存的block data
    const handleSubmitEdit = () => {
        saveEditBlocks(blocksDataTmp)
    }
    let wordblock = count.map((item, index) => {
        return (
            <WordBlock
                index={index}
                key={index}
                blockStates={blockStates}
                setblockStates={setblockStates}
                blocksData={blocksData}
            >
            </WordBlock>
        )
    })
    return (
        <EditDataCtx.Provider value={{ updateData,handleLoadData }}>
            <div
                className={editIndex}

            >
                <FileView></FileView>
                <div
                    className={editAndPreview}
                    ref={(el) => {
                        toBottom = el
                    }}>
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

            </div>
        </EditDataCtx.Provider>
    )
}

export default EditIndex
