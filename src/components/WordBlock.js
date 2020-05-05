import React, { useState, useContext, useEffect } from 'react'
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


    const englishPlaceHolder = "English"
    const chinesePlaceHolder = "Chinese"

    let inputRefList = [{
        refList: []
    }]

    //hooks
    const {updateData } = useContext(EditDataCtx)
    const [english, setenglish] = useState('')
    const [chinese, setchinese] = useState('')
    const [meanings, setmeanings] = useState([{
        meaning: '',
        collections: ['']
    }])
    useEffect(() => {
        updateData(index,english,chinese,meanings)
        return () => {
        }
    })
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
    const handleChinese = (e) => {
        setchinese(e.target.value)
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
                    onChange={(e) => {
                        handleEnligsh(e)
                    }}
                />
                <input
                    type="text"
                    className={chineseInput}
                    placeholder={chinesePlaceHolder}
                    onChange={(e)=>{
                        handleChinese(e)
                    }}
                />
            </div>
            <WordExplain
                ifPutDown={props.blockStates[index]}
                meanings={meanings}
                setmeanings={setmeanings}
                inputRefList={inputRefList}
            ></WordExplain>
        </div>
    )
}
export default WordBlock
