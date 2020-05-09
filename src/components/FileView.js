import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import FoldBlock from './FoldBlock'
//COMPONENT fileview 组件 用于展示NoteBook文件结构
function FileView() {
    //classnames
    const fileView = classnames('fileView')
    const fileViewControler = classnames('fileViewControler')
    //consts
    const maxWidth = 400
    const minWidth = 50

    //hooks
    const [noteBookNames, setnoteBookNames] = useState([])
    const [fileNames, setfileNames] = useState([])
    const [fileViewWidth, setfileViewWidth] = useState(200)

    const [ifDrag, setifDrag] = useState(false)
    const [startX, setstartX] = useState(0)
    const [startWidth, setstartWidth] = useState(0)
    const [fileViewVisible, setfileViewVisible] = useState('visible')
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

        if (window.ipcRenderer) {

            window.ipcRenderer.send('loadFileViewInfo-send', loadFlag)
            window.ipcRenderer.on('loadFileViewInfo-reply', (event, arg) => {
                console.log('arg is ', arg.fileNames)
                if (loadFlag) {
                    setfileNames(arg.fileNames)
                    setnoteBookNames(arg.noteBookNames)
                }
            })
            return () => {
                loadFlag = false
            }
        }
    }, [])
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
            }
            if (newWidth < minWidth) {
                setfileViewVisible('hidden')
            }
            setfileViewWidth(newWidth)
        }
    }
    const handelDragEnd = (e) => {
        setifDrag(false)
        localStorage.setItem('scalable_width', fileViewWidth)
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
                            key={fold_index}
                            index={fold_index}
                            notBookName={fold_item}
                            notBookNames={noteBookNames}
                            fileNames={fileNames}
                            setfileNames={setfileNames}
                        ></FoldBlock>
                    )
                })
                }
            </div>
            <div
                className={fileViewControler}
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