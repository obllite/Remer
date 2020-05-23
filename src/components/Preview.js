import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import emitter from '../utils/events'

import electron_api from '../api/index'

function Preview() {
    //classnames
    const preview = classnames('print','preview')
    const previewController = classnames('noprint','previewController')

    const preBlock = classnames('preBlock')
    const preBlockHead = classnames('preBlockHead')
    const preEnglish = classnames('pre preEnglish')
    const preChinese = classnames('pre preChinese')
    const preMeaning = classnames('pre preMeaning')
    const preCollection = classnames('pre preCollection')

    const [startWidth, setstartWidth] = useState(0)
    const [previewWidth, setpreviewWidth] = useState(400)
    //consts
    const maxWidth = 800
    const minWidth = 100
    //hooks
    const [ifDrag, setifDrag] = useState(false)
    const [startX, setstartX] = useState(0)
    const [previewData, setpreviewData] = useState([])
    const [preViewVisible, setpreViewVisible] = useState('visible')
    useEffect(() => {
        document.addEventListener('mousemove', handleDrag)
        document.addEventListener('mouseup', handelDragEnd)
        return () => {
            document.removeEventListener('mousemove', handleDrag)
            document.removeEventListener('mouseup', handelDragEnd)
        }
    })
    useEffect(() => {
        let ifMounted = true
        emitter.addListener('updatePreviewData', (data) => {
            if (ifMounted && data[0] !== undefined) {
                console.log('preview data is ', data)
                setpreviewData(data)
            }
        })
        return () => {
            ifMounted = false
        }
    }, [])
    const handleDragStart = (e) => {
        setstartX(e.clientX)
        setstartWidth(previewWidth)
        setifDrag(true)
    }
    const handleDrag = (e) => {
        if (ifDrag) {
            let newWidth = startWidth + (startX - e.clientX);
            //console.log('new width is',newWidth)
            setpreViewVisible('visible')
            if (newWidth > maxWidth) {
                newWidth = maxWidth
                setpreviewWidth(newWidth)
            } else if (newWidth < minWidth) {
                setpreViewVisible('hidden')
                setpreviewWidth(0)
            } else {
                setpreviewWidth(newWidth)
            }
        }
    }
    const handelDragEnd = () => {
        setifDrag(false)
        localStorage.setItem('preview-drag', previewWidth)
    }

    const menuHandlePDF = () => {
        let data = [...previewData]
        window.ipcRenderer.send('printPdf-send', data)
        window.ipcRenderer.on('printPdf-reply',(event, result)=>{
            console.log('printPdf result is ', result)
        })
    }
    /* preview context menu config */
    const previewMenuTmp = [{
        label: 'print pdf',
        click: () => {
            console.log('preview menu print pdf is called')
            menuHandlePDF()
        }
    }]
    return (
        <div
            className={preview}
            onContextMenu={() => {
                const previewMenu = electron_api.newCxtMenu(previewMenuTmp)
                previewMenu.popup({
                    callback: ()=>{
                        console.log('preview menu is closed')
                    }
                })
            }}
        >
            <div
                className={previewController}
                onMouseDown={(e) => {
                    handleDragStart(e)
                }}
                onMouseUp={(e) => {
                    handelDragEnd()
                }}
            >
            </div>
            {/* this is preview */}
            <div
                style={{
                    width: previewWidth + 'px',
                    visibility: preViewVisible
                }}
            >

                {
                    previewData[0] !== undefined ? previewData.map((block_item, block_index) => {
                        return (
                            <div
                                key={block_index}
                                className={preBlock}
                            >
                                <div className={preBlockHead}>
                                    <div className={preEnglish}>
                                        {block_item.english}
                                    </div>
                                    <div className={preChinese}>
                                        {block_item.chinese}
                                    </div>
                                </div>
                                {
                                    block_item.meanings.map((meaning_item, meaning_index) => {
                                        return (
                                            <div key={meaning_index}>
                                                <div
                                                    className={preMeaning}
                                                >
                                                    {meaning_item.meaning}
                                                </div>
                                                {
                                                    meaning_item.collections.map((collection_item, collection_index) => {
                                                        return (
                                                            <div
                                                                key={collection_index}
                                                                className={preCollection}
                                                            >
                                                                {collection_item}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }) : 'no data'
                }
            </div>
        </div>
    )
}

export default Preview