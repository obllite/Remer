import React, { useState, useEffect, useRef } from 'react'
import classnames from 'classnames'
import handleNewFile, { loadFileViewInfo, validateFileName } from '../utils/fileViewHandler'

//COMPONENT 组件用于显示一个NoteBook下的文件结构
function FoldBlock(props) {
    const {
        index
    } = props
    //classnames
    const newFileLi = classnames('newFileLi')
    const foldList = classnames('foldList')
    const fileList = classnames('fileList')
    const addFileIcon = classnames('iconfont icon-tianjiawenjian-')
    const fileIcon = classnames('iconfont icon-wenjian')
    const foldOpenIcon = classnames('iconfont icon-wenjianjiadakaizhuangtai')
    const foldCloseIcon = classnames('iconfont icon-wenjianjiaguanbizhuangtai')
    let ifCanNew = false
    //hooks
    const [ifNewFile, setifNewFile] = useState(false)
    const [filelis, setfilelis] = useState([])
    const fileNewRef = useRef()
    const [ifPutDown, setifPutDown] = useState(true)
    const fileNewLiRef = useRef()
    useEffect(() => {
        setfilelis(props.fileNames[index].names.map((item, i) => { 
            if(i === 0 ) {
                return true
            } else {
                return false 
            }
        }))
    }, [])
    useEffect(() => {
        if (ifNewFile) {
            fileNewRef.current.focus()
        }
    }, [ifNewFile])

    //handlers
    const handleFold = (e) => {
        switch (e.target.className) {
            case foldCloseIcon:
                e.target.className = foldOpenIcon
                setifPutDown(true)
                break;
            case foldOpenIcon:
                e.target.className = foldCloseIcon
                setifPutDown(false)
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
            ifCanNew = validateFileName(fileNewRef.current.value, props.fileNames[index].names)
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
    //FIXME handleNewFile 中有异步问题
    const handleNewFileBlur = (e) => {
        if (fileNewRef.current.value === '') {
            setifNewFile(false)
        } else {
            ifCanNew = validateFileName(fileNewRef.current.value, props.fileNames[index].names)
            if (!ifCanNew) {
                setifNewFile(false)
                return
            }
            setifNewFile(false)
            let fileName = fileNewRef.current.value
            let filePath = '/' + props.notBookNames[index] + '/' + fileName
            handleNewFile(fileName, filePath)
            let newNames = [...props.fileNames[index].names, fileName]
            props.setfileNames(props.fileNames.map((item, i) => {
                if (i === index) {
                    item.names = newNames
                }
                return item
            }))
        }
    }
    const handleNewFileKeyDown = (e) => {
        if (e.keyCode === 13 && ifCanNew) {
            setifNewFile(false)
            let fileName = fileNewRef.current.value
            let filePath = '/' + props.notBookNames[index] + '/' + fileName
            handleNewFile(fileName, filePath)
            let newNames = [...props.fileNames[index].names, fileName]
            props.setfileNames(props.fileNames.map((item, i) => {
                if (i === index) {
                    item.names = newNames
                }
                return item
            }))
        }
    }

    return (
        <>
            <div className={foldList}>
                <span
                    className={foldOpenIcon}
                    onClick={(e) => {
                        handleFold(e)
                    }}
                ></span>
                {props.notBookName}
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
                    {props.fileNames[index].names.map((item, index) => {
                        return (
                            <li
                                key={index}
                                //TODO 实现 file list 到 edit 区域的切换、 实现右键菜单栏
                                onContextMenu={(e) => {
                                    e.nativeEvent.stopPropagation()
                                    let IMenu = {}//menu 接口
                                    if (window.ipcRenderer) {
                                        window.ipcRenderer.send('show-context-menu', IMenu)
                                    }
                                }}
                                onClick={(e) => {
                                    setfilelis(filelis.map((fileli_item, fileli_i) => {
                                        if (fileli_i === index) {
                                            fileli_item = true
                                        } else {
                                            fileli_item = false
                                        }
                                        return fileli_item
                                    }))
                                    
                                }}
                                style={filelis[index] ? { 
                                    backgroundColor: "#ced4da",
                                } : {}}
                            >
                                <span className={fileIcon}></span>
                                {item}
                            </li>
                        )
                    })}
                </ul> : <></>}
        </>)
}

export default FoldBlock