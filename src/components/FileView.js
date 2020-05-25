import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import FoldBlock from './FoldBlock'

//COMPONENT fileview 组件 用于展示NoteBook文件结构
function FileView() {
    //classnames
    const fileView = classnames('noprint', 'fileView')
    const fileViewController = classnames('noprint', 'fileViewController')
    //consts
    const maxWidth = 300
    const minWidth = 50
    let currentFilePath = ''
    //hooks
    const [noteBookNames, setnoteBookNames] = useState([])
    const [fileNames, setfileNames] = useState([])
    const [fileViewWidth, setfileViewWidth] = useState(200)

    const [ifDrag, setifDrag] = useState(false)
    const [startX, setstartX] = useState(0)
    const [startWidth, setstartWidth] = useState(0)
    const [fileViewVisible, setfileViewVisible] = useState('visible')
    const [filelis, setfilelis] = useState([])
    useEffect(() => {
        document.addEventListener('mousemove', handleDrag)
        document.addEventListener('mouseup', handelDragEnd)
        return () => {
            document.removeEventListener('mousemove', handleDrag)
            document.removeEventListener('mouseup', handelDragEnd)
        }
    })
    useEffect(() => {
        let loadFlag = 'file view init'

        if (loadFlag && !ifDrag && localStorage.getItem("scalable_width")) {
            setfileViewWidth(parseInt(localStorage.getItem("scalable_width")))
        }
        /* HOOK 加载file View 的信息 */
        if (window.ipcRenderer && loadFlag) {
            window.ipcRenderer.send('loadFileViewInfo-send', loadFlag)
            window.ipcRenderer.on('loadFileViewInfo-reply', (event, arg) => {
                if (loadFlag) {
                    let flag = false
                    if (arg.hasOwnProperty("lastViewedFile")) {
                        flag = true
                        console.log('arg is', arg)
                        console.log('last time viewed file is', arg.lastViewedFile)
                        console.log('last time viewed notebook is', arg.lastViewedNoteBook)
                    }
                    setfileNames(arg.fileNames)
                    setnoteBookNames(arg.noteBookNames)
                    let tmpArr = []
                    arg.fileNames.forEach((element, noteBook_i) => {
                        tmpArr.push(element.names.map((item, file_i) => {
                            if (flag && item === arg.lastViewedFile) {
                                return true
                            }
                            if (noteBook_i === 0 && file_i === 0 && !flag) {
                                return true
                            }
                            return false
                        }))
                    });
                    setfilelis(tmpArr)
                }
            })
            return () => {
                loadFlag = false
            }
        }
    }, [])

    useEffect(() => {
        getCurrentFilePath()
    }, [filelis])

    //handlers
    const handleDragStart = (e) => {
        setstartX(e.clientX)
        setstartWidth(fileViewWidth)
        setifDrag(true)
    }
    const handleDrag = (e) => {
        if (ifDrag) {
            let newWidth = startWidth + e.clientX - startX;
            setfileViewVisible('visible')
            if (newWidth > maxWidth) {
                newWidth = maxWidth
                setfileViewWidth(newWidth)
            } else if (newWidth < minWidth) {
                setfileViewVisible('hidden')
                setfileViewWidth(0)
            } else {
                setfileViewWidth(newWidth)
            }
        }
    }
    const handelDragEnd = (e) => {
        setifDrag(false)
        localStorage.setItem('scalable_width', fileViewWidth)
    }
    const getCurrentFilePath = () => {
        let result = {
            noteBook: '',
            fileName: ''
        }
        if (filelis.length > 0) {
            for (let noteBook_i = 0; noteBook_i < filelis.length; noteBook_i++) {
                for (let file_i = 0; file_i < filelis[noteBook_i].length; file_i++) {
                    const element = filelis[noteBook_i][file_i];
                    if (element) {
                        result.noteBook = noteBookNames[noteBook_i]
                        result.fileName = fileNames[noteBook_i].names[file_i]
                        currentFilePath = '/' + result.noteBook + '/' + result.fileName
                        //console.log('current path is', currentFilePath)
                        if (window.ipcRenderer) {
                            /* HOOK 用于当前的文件路径，方便以后载入缓存 */
                            window.ipcRenderer.send("syncFilePath-send", currentFilePath)
                        }
                        return result
                    }
                }
            }
        }
    }
    return (
        <>
            <div className={fileView}
                style={{
                    width: fileViewWidth + 'px',
                    visibility: fileViewVisible
                }}
            >
                {noteBookNames.map((fold_item, fold_index) => {
                    return (
                        <FoldBlock
                            ifFirst={fold_index === 0 ? true : false}
                            ifLast={fold_index === noteBookNames.length - 1 ? true : false}
                            key={fold_index}
                            index={fold_index}
                            notBookName={fold_item}
                            notBookNames={noteBookNames}
                            fileNames={fileNames}
                            setfileNames={setfileNames}
                            filelis={filelis}
                            setfilelis={setfilelis}
                        ></FoldBlock>
                    )
                })
                }
            </div>
            <div
                className={fileViewController}
                onMouseDown={(e) => {
                    handleDragStart(e)
                }}
                onMouseUp={(e) => {
                    handelDragEnd()
                }}
            >
            </div>
        </>

    )
}
export default FileView