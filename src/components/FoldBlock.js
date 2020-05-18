import React, { useState, useEffect, useRef, useContext } from 'react'
import classnames from 'classnames'
import handleNewFile, { validateFileName } from '../utils/fileViewHandler'
import EditDataCtx from './EditDataCtx'
//FIXME rollback之后的 switch 可能存在内存泄漏
//COMPONENT 组件用于显示一个NoteBook下的文件结构
function FoldBlock(props) {
    const {
        index,
        ifFirst,
        ifLast
    } = props
    //classnames
    const newFileLi = classnames('newFileLi')
    const foldList = classnames('foldList')
    const fileList = classnames('fileList')
    const addFileIcon = classnames('iconfont icon-tianjiawenjian-')
    const fileIcon = classnames('iconfont icon-wenjian')
    const foldOpenIcon = classnames('iconfont icon-wenjianjiadakaizhuangtai')
    const foldCloseIcon = classnames('iconfont icon-wenjianjiaguanbizhuangtai')

    const fileli = classnames('fileli')
    const indentation = classnames('indentation')
    //consts
    let ifCanNew = false

    //hooks
    const [ifNewFile, setifNewFile] = useState(false)
    const [ifPutDown, setifPutDown] = useState(true)

    const { handleLoadData } = useContext(EditDataCtx)

    const foldIconRef = useRef()
    const fileNewRef = useRef()
    const fileNewLiRef = useRef()

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
        foldIconRef.current.className = foldOpenIcon
        setifPutDown(true)
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

    const handleSwitchFile = (e, file_index) => {
        //console.log('fillis is', props.filelis[index])
        //save current file content to cache
        let currentIndex = props.filelis[index].indexOf(true)
        //console.log('current file is ', props.fileNames[index].names[currentIndex])
        //laod new file to edit
        let fileName = props.fileNames[index].names[file_index]
        //console.log('will switch to ', fileName)
        let filePath = '/noteBooks/' + props.notBookName + '/' + fileName
        //console.log('will switch file path is ', filePath)
        /* HOOK加载 */
        window.ipcRenderer.send('loadfile-send', filePath)
        //下面应放在edit 中
        window.ipcRenderer.on('loadfile-reply', (event, arg) => {
            //console.log('recieve main processs back data ', arg)
            handleLoadData(arg)
        })
    }
    const change2True = (change_i) => {
        let tmpArr = props.filelis
        tmpArr = tmpArr.map((tmp_item, tmp_i) => {
            if (tmp_i === index) {
                tmp_item = tmp_item.map((item, i) => {
                    if (change_i === i) {
                        return true
                    }
                    return false
                })
            } else {
                tmp_item = tmp_item.map((tmp_item, tmp_i) => {
                    tmp_item = false
                    return tmp_item
                })
            }
            return tmp_item
        })
        props.setfilelis(tmpArr)
    }
    return (
        <>
            <div
                className={foldList}
                style={ifPutDown||ifLast?{}:{
                    backgroundClip: "padding-box",
                    borderBottom: "2px dashed #65AD83"
                }}
            >
                <span
                    className={foldOpenIcon}
                    onClick={(e) => {
                        handleFold(e)
                    }}
                    ref={foldIconRef}
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
                <div className={fileList}>
                    {ifNewFile ?
                        (<li className={newFileLi} ref={fileNewLiRef}>
                            <div className={indentation}></div>
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
                    {props.fileNames[index].names.map((item, file_i) => {
                        return (
                            <div
                                key={file_i}
                                className={fileli}
                                onContextMenu={(e) => {
                                    e.nativeEvent.stopPropagation()
                                    //TODO 实现右键菜单
                                    if (window.ipcRenderer) {
                                        window.ipcRenderer.send('fileViewMenu-send')
                                        window.ipcRenderer.on('fileViewMenu-reply',(event,arg)=>{
                                            console.log(arg)
                                        })
                                    }
                                }}
                                onClick={(e) => {
                                    change2True(file_i)
                                    handleSwitchFile(e, file_i)
                                }}
                                style={
                                    props.filelis[index] !== undefined && props.filelis[index][file_i] ? {
                                        backgroundColor: "#ced4da"
                                    } : {}
                                }
                            >
                                <div className={indentation}></div>
                                <span className={fileIcon}></span>
                                {item}
                            </div>
                        )
                    })}
                </div> : <></>}
        </>)
}

export default FoldBlock