import React, { useState, useEffect, useRef } from 'react'
import classnames from 'classnames'
import handleNewFile, { validateFileName } from '../utils/fileViewHandler'
//COMPONENT 组件用于显示一个NoteBook下的文件结构
function FoldBlock(props) {
    const {
        index
    } = props
    const newFileLi = classnames('newFileLi')
    const foldList = classnames('foldList')
    const fileList = classnames('fileList')
    const addFileIcon = classnames('iconfont icon-tianjiawenjian-')
    const fileIcon = classnames('iconfont icon-wenjian')
    const foldOpenIcon = classnames('iconfont icon-wenjianjiadakaizhuangtai')
    const foldCloseIcon = classnames('iconfont icon-wenjianjiaguanbizhuangtai')

    let ifCanNew = false
    const [ifNewFile, setifNewFile] = useState(false)
    const fileNewRef = useRef()
    const [ifPutDown, setifPutDown] = useState(true)
    const fileNewLiRef = useRef()
    useEffect(() => {
        if (ifNewFile) {
            fileNewRef.current.focus()
        }
    }, [ifNewFile])
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
        console.log('index is ',index)
        console.log(props.fileNames[index].names)
        setifNewFile(true)
    }
    const hanleNewFileChange = (e) => {
        if (fileNewRef.current.value !== '') {
            ifCanNew = validateFileName(fileNewRef.current.value, props.fileNames[index].names)
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
            ifCanNew = validateFileName(fileNewRef.current.value, props.fileNames[index].names)
            if (!ifCanNew) {
                setifNewFile(false)
                return
            }
            setifNewFile(false)
            let newNames = [...props.fileNames[index].names, handleNewFile(fileNewRef.current.value)]
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
            let newNames = [...props.fileNames[index].names, handleNewFile(fileNewRef.current.value)]
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
                    className={foldCloseIcon}
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