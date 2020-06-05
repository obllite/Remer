import React, { useState, useEffect, useRef, useContext } from 'react'
import classnames from 'classnames'
import handleNewFile, { validateFileName } from '../utils/fileViewHandler'
import EditDataCtx from './EditDataCtx'
import electron_api from '../api/index'
//FIXME rollback之后的 switch 可能存在内存泄漏
//COMPONENT 组件用于显示一个NoteBook下的文件结构

//git test
function FoldBlock(props) {
    const {
        index,
        ifLast
    } = props
    //menu notifier
    const menuhandleRename = () => {
        console.log('rename clicked')
        renameHandler(index, currentFileIndex)
    }
    const menuhandleDelete = () => {
        console.log('delete clicked')
        deleteHandler(index, currentFileIndex)
    }
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
    let ifCanRename = false
    const ifRenameInit = -1
    let currentFileIndex = -1
    //hooks
    const [ifNewFile, setifNewFile] = useState(false)
    const [ifPutDown, setifPutDown] = useState(true)
    const [ifRename, setifRename] = useState({
        noteBook_i: -1,
        file_i: -1
    })

    const { handleLoadData } = useContext(EditDataCtx)

    const foldIconRef = useRef()
    const fileNewRef = useRef()
    const fileNewLiRef = useRef()
    const renameRef = useRef(null)

    useEffect(() => {
        if (ifNewFile) {
            fileNewRef.current.focus()
        }
    }, [ifNewFile])

    useEffect(() => {
        if (renameRef.current) {
            console.log('rename effect inner')
            renameRef.current.focus()
        }
    }, [ifRename])

    useEffect(() => {
        //console.log('renameRef is update')
    }, [renameRef])
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
        //let currentIndex = props.filelis[index].indexOf(true)
        //console.log('current file is ', props.fileNames[index].names[currentIndex])
        //laod new file to edit
        let fileName = props.fileNames[index].names[file_index]
        //console.log('will switch to ', fileName)
        let filePath = '/noteBooks/' + props.notBookName + '/' + fileName
        //console.log('will switch file path is ', filePath)
        /* HOOK 加载 */
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

    /* context menu  */
    /* rename */
    // 显示输入的 input
    const renameHandler = (noteBook_i, file_i) => {
        if (file_i === -1) {
            console.log('rename err')
            return
        }
        console.log('renameHandler', noteBook_i, file_i)
        setifRename({
            noteBook_i: noteBook_i,
            file_i: file_i
        })
    }

    const handleRenameChange = (e) => {
        console.log('ref is', renameRef)
        console.log('ref current is', renameRef.current)
        ifCanRename = validateFileName(renameRef.current.value, props.fileNames[index].names)
        if (!ifCanRename) {
            renameRef.current.style.color = "red"
            renameRef.current.style.color = "red"
            renameRef.current.focus()
            return
        } else {
            renameRef.current.style.color = "black"
            renameRef.current.style.color = "black"
        }
    }

    const handleRenameKeyDown = (e) => {
        if (e.keyCode === 13 && ifCanRename) {
            let newFileName = renameRef.current.value
            let newFileIndex = ifRename.file_i
            let arg = getRenameArg()
            console.log('old path is ', arg.oldPath)
            console.log('new path is ', arg.newPath)
            /* HOOK 重命名文件 */
            window.ipcRenderer.send('rename-send', arg)
            window.ipcRenderer.on('rename-reply', (event, result) => {
                //此处更新视图中的信息
                if (result) {
                    //props.fileNames[index].names[] = newFileName
                    console.log('new file naem is ', newFileName)
                    console.log('new file index is', ifRename.file_i, 'type is ', ifRename.file_i)
                    props.setfileNames(props.fileNames.map((item, i) => {
                        if (i === index) {
                            let tmpArr = item.names
                            tmpArr[newFileIndex] = newFileName
                            item.names = tmpArr
                        }
                        return item
                    }))
                } else {
                    console.log('rename false')
                }
                setifRename({
                    noteBook_i: -1,
                    file_i: -1
                })
            })
        }
    }

    const handleRenameBlur = (e) => {
        if (renameRef.current.value === '' || !ifCanRename) {
            setifRename(ifRenameInit)
        } else {
            let newFileName = renameRef.current.value
            let newFileIndex = ifRename.file_i
            let arg = getRenameArg()
            console.log('old path is ', arg.oldPath)
            console.log('new path is ', arg.newPath)
            window.ipcRenderer.send('rename-send', arg)
            window.ipcRenderer.on('rename-reply', (event, result) => {
                //此处更新视图中的信息
                if (result) {
                    //props.fileNames[index].names[] = newFileName
                    console.log('new file naem is ', newFileName)
                    console.log('new file index is', ifRename.file_i, 'type is ', ifRename.file_i)
                    props.setfileNames(props.fileNames.map((item, i) => {
                        if (i === index) {
                            let tmpArr = item.names
                            tmpArr[newFileIndex] = newFileName
                            item.names = tmpArr
                        }
                        return item
                    }))
                } else {
                    //添加 notifier 警告
                    console.log('rename false')
                }
                setifRename({
                    noteBook_i: -1,
                    file_i: -1
                })
            })
        }
    }

    const getRenameArg = () => {
        let noteBook_i = index
        let file_i = ifRename.file_i
        let oldPath = '/' + props.notBookNames[noteBook_i] + '/' + props.fileNames[index].names[file_i]
        let newPath = '/' + props.notBookNames[noteBook_i] + '/' + renameRef.current.value
        let arg = {
            type: "file",
            oldPath: oldPath,
            newPath: newPath,
        }
        return arg
    }

    const deleteHandler = (noteBook_i, currentFileIndex) => {
        let path = '/' + props.notBookNames[noteBook_i] + '/' + props.fileNames[index].names[currentFileIndex]
        console.log('delete path is ',path)
        /* HOOK delete file */
        window.ipcRenderer.send('deletefile-send',path)
        window.ipcRenderer.on('deletefile-reply',(event, result)=>{
            console.log('delete file result is', result)
            if(result){
                console.log('delete currentFileIndex is ',currentFileIndex)
                //更新视图中的信息
                props.setfileNames(props.fileNames.map((item, i) => {
                    if (i === index) {
                        let tmpArr = item.names
                        tmpArr.splice(currentFileIndex, 1)
                        item.names = tmpArr
                    }
                    return item
                }))
            } else {
                // 添加notifier 警告
                console.log('delete file false')
            }
        })
    }
    /* menu config template */
    const fileViewMenuTmp = [{
        label: 'rename',
        click: menuhandleRename
    }, {
        label: 'delete',
        click: menuhandleDelete
    }]
    return (
        <>
            <div
                className={foldList}
                style={ifPutDown || ifLast ? {} : {
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
                            ifRename.noteBook_i === index && ifRename.file_i === file_i ?
                                <div
                                    key={file_i}
                                    className={newFileLi}
                                >
                                    <div className={indentation}></div>
                                    <span className={fileIcon}></span>
                                    <input type="text"
                                        ref={renameRef}
                                        onChange={(e) => {
                                            handleRenameChange(e)
                                        }}
                                        onKeyDown={(e) => {
                                            handleRenameKeyDown(e)
                                        }}
                                        onBlur={(e) => {
                                            handleRenameBlur(e)
                                        }
                                        }
                                    />
                                </div>
                                : <div
                                    key={file_i}
                                    className={fileli}
                                    onContextMenu={(e) => {
                                        //更新current file index
                                        currentFileIndex = file_i
                                        const fileViewMenu = electron_api.newCxtMenu(fileViewMenuTmp)
                                        fileViewMenu.popup({
                                            callback: () => {
                                                console.log('context menu closed')
                                                //renameHandler(index, file_i)
                                            }
                                        })
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