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
        /* HOOK 加载file View 的信息 */
        if (window.ipcRenderer) {
            window.ipcRenderer.send('loadFileViewInfo-send', loadFlag)
            window.ipcRenderer.on('loadFileViewInfo-reply', (event, arg) => {
                if (loadFlag) {
                    setfileNames(arg.fileNames)
                    setnoteBookNames(arg.noteBookNames)
                    let tmpArr = []
                    arg.fileNames.forEach((element,noteBook_i) => {
                        tmpArr.push(element.names.map((item, file_i)=>{
                            if(noteBook_i === 0&& file_i === 0){
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
                            ifFirst={fold_index === 0 ? true: false}
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