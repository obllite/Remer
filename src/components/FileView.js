import React, { useState, useEffect, useRef } from 'react'
import classnames from 'classnames'
import handleNewFile, { validateFileName } from '../utils/fileViewHandler'

function FileView() {
    const fileView = classnames('fileView')
    const fileViewControler = classnames('fileViewControler')
    const newFileLi = classnames('newFileLi')
    const foldList = classnames('foldList')
    const fileList = classnames('fileList')
    const foldOpenIcon = classnames('iconfont icon-wenjianjiadakaizhuangtai')
    const foldCloseIcon = classnames('iconfont icon-wenjianjiaguanbizhuangtai')
    const addFileIcon = classnames('iconfont icon-tianjiawenjian-')
    const fileIcon = classnames('iconfont icon-wenjian')
    //consts
    const maxWidth = 400
    const minWidth = 50
    let ifCanNew = false
    //hooks
    const [fileNames, setfileNames] = useState(['a.json', 'b.json', 'c.json'])
    const [fileViewWidth, setfileViewWidth] = useState(200)
    const [ifPutDown, setifPutDown] = useState(true)
    const [ifDrag, setifDrag] = useState(false)
    const [startX, setstartX] = useState(0)
    const [startWidth, setstartWidth] = useState(0)
    const [fileViewVisible, setfileViewVisible] = useState('visible')
    const [ifNewFile, setifNewFile] = useState(false)
    const fileNewRef = useRef()
    const fileNewLiRef = useRef()
    useEffect(() => {
        document.addEventListener('mousemove', handleDrag)
        document.addEventListener('mouseup', handelDragEnd)
        return () => {
            document.removeEventListener('mousemove', handleDrag)
            document.removeEventListener('mouseup', handelDragEnd)
        }
    })
    useEffect(() => {
        if (ifNewFile) {
            fileNewRef.current.focus()
        }
    }, [ifNewFile])
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
    const handleFold = (e) => {
        switch (e.target.className) {
            case foldCloseIcon:
                e.target.className = foldOpenIcon
                setifPutDown(false)
                break;
            case foldOpenIcon:
                e.target.className = foldCloseIcon
                setifPutDown(true)
                break;
            default:
                break;
        }
    }
    const handleaddFile = (e) => {
        setifNewFile(true)
    }
    const hanleNewFileChange = (e) => {
        if (fileNewRef.current.value !== '') {
            ifCanNew = validateFileName(fileNewRef.current.value, fileNames)
            console.log(fileNewRef.current.value)
            if (!ifCanNew) {
                fileNewLiRef.current.style.color = "red"
                fileNewRef.current.style.color = "red"
                fileNewRef.current.focus()
                return
            } else {
                fileNewLiRef.current.style.color = "black"
                fileNewRef.current.style.color = "black"
            }
        }
    }
    const handleNewFileBlur = (e) => {
        if (fileNewRef.current.value === '') {
            setifNewFile(false)
        } else {
            ifCanNew = validateFileName(fileNewRef.current.value, fileNames)
            if (!ifCanNew) {
                setifNewFile(false)
                return
            }
            setifNewFile(false)
            setfileNames([...fileNames, handleNewFile(fileNewRef.current.value)])
        }
    }
    const handleNewFileKeyDown = (e) => {
        if (e.keyCode === 13 && ifCanNew) {
            setifNewFile(false)
            setfileNames([...fileNames, handleNewFile(fileNewRef.current.value)])
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
                <div className={foldList}>
                    <span
                        className={foldCloseIcon}
                        onClick={(e) => {
                            handleFold(e)
                        }}
                    ></span>
                    Notebook1
                    <span
                        className={addFileIcon}
                        onClick={(e) => {
                            handleaddFile(e)
                        }}
                    ></span>
                </div>
                {ifPutDown ?
                <ul className={fileList}>
                    {ifNewFile ?
                        (<li className={newFileLi} ref={fileNewLiRef}>
                            <span className={fileIcon}></span>
                            <input type="text"
                                ref={fileNewRef}
                                onKeyDown={(e) => {
                                    handleNewFileKeyDown(e)
                                }}
                                onChange={(e) => {
                                    hanleNewFileChange(e)
                                }}
                                onBlur={(e) => {
                                    handleNewFileBlur(e)
                                }
                                }
                            />
                        </li>) : <></>}
                    {fileNames.map((item, index) => {
                        return (
                            <li
                                key={index}
                            >
                                <span className={fileIcon}></span>
                                {item}
                            </li>
                        )
                    })}
                </ul>:<></>}
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