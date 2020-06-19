import React, { useState, useRef, useEffect } from 'react'
import classnames from 'classnames';
import WordBlock from './WordBlock'
import FileView from './FileView'
import EditDataCtx from './EditDataCtx'
import Preview from './Preview'
import saveEditBlocks from '../utils/saveEditBlocks'
import saveBlockState, { getBlockState } from '../utils/savePageState'
import emitter from '../utils/events'
import electron_api from '../api';

//COMPONENT 创建，打开，编辑 notebook 文件的组件
//TODO 提交时对word block trim
//TODO添加OptionOrAlt+up/down 移动块内input快捷键
const maxlength = 25;
function EditIndex() {
    const editIndex = classnames('editIndex')
    const editAndPreview = classnames('editAndPreview')
    const edit = classnames('noprint', 'edit')
    const addBlock = classnames('addBlock')
    const addBlockContainer = classnames('addBlockContainer')
    const submitEdit = classnames('submitEdit')
    const submitEditContainer = classnames('submitEditContainer')
    const bottomBtn = classnames('bottomBtn')
    const dividingLine = classnames('dividingLine')
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
        emitter.emit('updatePreviewData', [...blocksDataTmp])
    }

    //hooks
    const [blocksData, setblocksData] = useState([])
    const [count, setcount] = useState([1])
    const [blockStates, setblockStates] = useState(blockStatesTmp)
    // eslint-disable-next-line no-unused-vars
    const [currentFilePath, setcurrentFilePath] = useState('')
    let toBottom = useRef()
    useEffect(() => {
        scrollToBottom()
    }, [count])
    useEffect(() => {
        let isMounted = true
        /* HOOK 加载cache 中暂存的 edit data*/
        if (window.ipcRenderer && isMounted) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //handlers
    const handleLoadData = (cacheData) => {
        let tempArr = []
        let tempCount = []
        for (const key in cacheData) {
            if (cacheData.hasOwnProperty(key)) {
                let index = key.split('#')[1]
                tempCount.push(index)
                const element = cacheData[key];
                tempArr[index] = element
            }
        }
        blockStatesTmp = tempCount.map(item => {
            return false
        })
        setblockStates(blockStatesTmp)
        setblocksData(tempArr)
        setcount(tempCount)
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

    // edit menu template
    //role 为对文本编辑的操作, 回调为对block的操作
    const editMenuTmp = [{
        //NOTE 未实现block 的撤销, 可以考虑优化
        label: '撤销',
        role: "undo",
    }, {
        type: 'separator'
    }, {
        label: '剪切',
        role: 'cut',
        accelerator: "CmdOrCtrl+X"
    }, {
        label: '复制',
        role: 'copy',
        accelerator: "CmdOrCtrl+C"
    }, {
        label: '粘贴',
        role: 'paste',
        accelerator: "CmdOrCtrl+V"
    }, {
        type: 'separator'
    }, {
        label: '剪切块',
        click: () => {
            let config = "cut"
            menuBlockHandler(config)
        }
    }, {
        label: '复制块',
        click: () => {
            let config = "copy"
            menuBlockHandler(config)
        }
    }, {
        label: '粘贴块',
        click: () => {
            let config = "paste"
            menuBlockHandler(config)
        }
    }, {
        type: 'separator'
    }, {
        label: '删除块',
        click: () => {
            let config = "delete"
            menuBlockHandler(config)
        }
    }]

    const menuBlockHandler = (config) => {
        //获取当前块
        let curBlockIndex = blockStates.indexOf(true)
        console.log("index is ", curBlockIndex)
        switch (config) {
            case "cut":
                //保存状态
                let cutState = {
                    index: curBlockIndex,
                    data: blocksData[curBlockIndex],
                    state: blockStates[curBlockIndex]
                }
                saveBlockState(cutState)
                //splice
                spliceBlock(curBlockIndex)
                break;
            case "copy":
                //保存状态
                let copeState = {
                    index: curBlockIndex,
                    data: blocksData[curBlockIndex],
                    state: blockStates[curBlockIndex]
                }
                saveBlockState(copeState)
                break;
            case "paste":
                let blockState = getBlockState()
                console.log(blockState)
                //恢复状态, 在当前 block 后插入
                let pasteCnt = count
                pasteCnt.push(pasteCnt.length.toString())
                let pasteState = blockStates
                pasteState[curBlockIndex] = false
                pasteState.splice(curBlockIndex + 1, 0, true)
                let pasteData = blocksData
                pasteData.splice(curBlockIndex + 1, 0, blockState.data)
                console.log("paste", pasteData, pasteState, pasteCnt)

                setcount([...pasteCnt])
                setblockStates(pasteState)
                setblocksData(pasteData)
                break;
            case "delete":
                spliceBlock(curBlockIndex)
                break;
            default:
                break;
        }
    }

    const spliceBlock = (curBlockIndex) => {
        let tempCnt = count
        for (let index = 0; index < tempCnt.length; index++) {
            if (index >= curBlockIndex) {
                tempCnt[index]--
                tempCnt[index] = tempCnt[index].toString()
            }
        }
        let stateTmp = blockStates
        stateTmp.splice(curBlockIndex, 1)
        if (curBlockIndex < stateTmp.length) {
            stateTmp[curBlockIndex] = true
        }
        blocksDataTmp.splice(curBlockIndex, 1)
        tempCnt.splice(curBlockIndex, 1)
        setcount(tempCnt)
        setblockStates(stateTmp)
        setblocksData(blocksDataTmp)
        console.log("spliceBlocke", tempCnt, stateTmp, blocksDataTmp)
    }
    return (
        <EditDataCtx.Provider value={{ updateData, handleLoadData, setcurrentFilePath }}>
            <div
                className={editIndex}
            >
                <FileView></FileView>
                <div
                    className={editAndPreview}
                >
                    <div
                        className={edit}
                        ref={(el) => {
                            toBottom = el
                        }}
                        onContextMenu={() => {
                            const editMenu = electron_api.newCxtMenu(editMenuTmp)
                            editMenu.popup({
                                callback: () => {
                                }
                            })
                        }}
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
                    <Preview></Preview>
                </div>

            </div>
        </EditDataCtx.Provider>
    )
}

export default EditIndex
