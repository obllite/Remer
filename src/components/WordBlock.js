import React, { useState, useContext, useEffect, useRef } from 'react'
import classnames from 'classnames'
import WordExplain from './WordExplain'
import EditDataCtx from './EditDataCtx'
//COMPONENT word block 组件 显示单词编辑的基本区域

function WordBlock(props) {
    const {
        index,
    } = props
    const wordBlock = classnames('wordBlock')
    const wordCount = classnames('wordCount')
    const englishInput = classnames('englishInput')
    const chineseInput = classnames('chineseInput')
    const inputContainer = classnames('inputContainer')
    let selfData = props.blocksData.length > 0 ? props.blocksData[index]: null
    //consts
    const englishPlaceHolder = "English"
    const chinesePlaceHolder = "Chinese"
    
    const meaningRefList = []
    let inputRefList = [{
        refList: []
    }]

    //hooks
    const { updateData } = useContext(EditDataCtx)
    const [english, setenglish] = useState('')
    const [chinese, setchinese] = useState('')
    const [meanings, setmeanings] = useState([{
        meaning: '',
        collections: ['']
    }])
    const englishInputRef = useRef()
    const chineseInputRef = useRef()
    useEffect(() => {
        updateData(index, english, chinese, meanings)
        return () => {
        }
    })
    useEffect(() => {
        if(selfData !== null&&selfData !== undefined){
            setenglish(selfData.english)
            setchinese(selfData.chinese)
            setmeanings(selfData.meanings)
        }
        return () => {
            
        }
    }, [selfData])
    //handlers
    const handlePutDown = (e) => {
        let blockStatesTmp = props.blockStates
        blockStatesTmp = blockStatesTmp.map(() => {
            return false
        })
        blockStatesTmp[index] = true
        props.setblockStates(blockStatesTmp)
    }
    const handleEnligsh = (e) => {
        setenglish(e.target.value)
    }
    const switch2Chinese = (e) => {
        if (e.keyCode === 39 && englishInputRef.current.selectionStart === englishInputRef.current.value.length) {
            setTimeout(() => {
                chineseInputRef.current.setSelectionRange(-1, -1)
            }, 0);
            chineseInputRef.current.focus()
        }
    }
    const handleChinese = (e) => {
        setchinese(e.target.value)
    }
    const switch2English = (e) => {
        if (e.keyCode === 37 && chineseInputRef.current.selectionStart === 0) {
            setTimeout(() => {
                englishInputRef.current.setSelectionRange(-1, -1)
            }, 0);
            englishInputRef.current.focus()
        }
        if (e.keyCode === 39 && chineseInputRef.current.selectionStart === chineseInputRef.current.value.length) {
            setTimeout(() => {
                meaningRefList[0].setSelectionRange(-1, -1)
            }, 0);
            meaningRefList[0].focus()
        }
        if (e.keyCode === 40) {
            setTimeout(() => {
                meaningRefList[0].setSelectionRange(-1, -1)
            }, 0);
            meaningRefList[0].focus()
        }
    }
    return (
        <div
            className={wordBlock}
            key={index}
            onClick={(e) => {
                e.nativeEvent.stopImmediatePropagation()
                handlePutDown(e)
            }}

        >
            <div className={inputContainer}>
                <div className={wordCount}>{index + 1}</div>
                <input
                    type="text"
                    className={englishInput}
                    placeholder={englishPlaceHolder}
                    value={english || ''}
                    onChange={(e) => {
                        handleEnligsh(e)
                    }}
                    onKeyDown={(e) => {
                        switch2Chinese(e)
                    }}
                    ref={englishInputRef}
                />
                <input
                    type="text"
                    className={chineseInput}
                    placeholder={chinesePlaceHolder}
                    value={chinese || ''}
                    onChange={(e) => {
                        handleChinese(e)
                    }}
                    onKeyDown={(e) => {
                        switch2English(e)
                    }}
                    ref={chineseInputRef}
                />
            </div>
            <WordExplain
                ifPutDown={props.blockStates[index]}
                meanings={meanings}
                meaningRefList={meaningRefList}
                setmeanings={setmeanings}
                inputRefList={inputRefList}
            ></WordExplain>
        </div>
    )
}
export default WordBlock
