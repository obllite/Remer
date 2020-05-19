import React, { useState, useEffect } from 'react'
import classnames from 'classnames'

function Preview() {
    //classnames
    const preview = classnames('preview')
    const previewControler = classnames('previewControler')
    const [startWidth, setstartWidth] = useState(0)
    const [previewWidth, setpreviewWidth] = useState(400)
    //consts
    const maxWidth = 600
    const minWidth = 400
    //hooks
    const [ifDrag, setifDrag] = useState(false)
    const [startX, setstartX] = useState(0)

    useEffect(() => {
        document.addEventListener('mousemove', handleDrag)
        document.addEventListener('mouseup', handelDragEnd)
        return () => {
            document.removeEventListener('mousemove', handleDrag)
            document.removeEventListener('mouseup', handelDragEnd)
        }
    })

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
            this is preview
        </div>
    )
}

export default Preview