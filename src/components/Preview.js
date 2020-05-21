import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import emitter from '../utils/events'
function Preview() {
    //classnames
    const preview = classnames('preview')
    const previewControler = classnames('previewControler')

    const preBlock = classnames('preBlock')
    const preEnglish = classnames('preEnglish')
    const preChinese = classnames('preChinese')
    const preMeaning = classnames('preMeaning')
    const preCollection = classnames('preCollection')

    const [startWidth, setstartWidth] = useState(0)
    const [previewWidth, setpreviewWidth] = useState(400)
    //consts
    const maxWidth = 600
    const minWidth = 400
    //hooks
    const [ifDrag, setifDrag] = useState(false)
    const [startX, setstartX] = useState(0)
    const [previewData, setpreviewData] = useState([])
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
            //setfileViewVisible('visible')
            if (newWidth > maxWidth) {
                newWidth = maxWidth
                setpreviewWidth(newWidth)
            } else if (newWidth < minWidth) {
                //setfileViewVisible('hidden')
                setpreviewWidth(minWidth)
            } else {
                setpreviewWidth(newWidth)
            }
        }
    }
    const handelDragEnd = () => {
        setifDrag(false)
        localStorage.setItem('preview-drag', previewWidth)
    }
    return (
        <div
            className={preview}
            style={{
                width: previewWidth + 'px'
            }}
        >
            <div
                className={previewControler}
                onMouseDown={(e) => {
                    handleDragStart(e)
                }}
                onMouseUp={(e) => {
                    handelDragEnd()
                }}
            >
            </div>
            {/* this is preview */}
            {
                previewData[0] !== undefined ? previewData.map((block_item, block_index) => {
                    return (
                        <div
                            key={block_index}
                            className={preBlock}
                        >
                            <div className={preEnglish}>
                                {block_item.english}
                            </div>
                            <div className={preChinese}>
                                {block_item.chinese}
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
    )
}

export default Preview