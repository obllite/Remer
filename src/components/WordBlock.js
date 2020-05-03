import React from 'react'
import classnames from 'classnames'
import WordExplain from './WordExplain'
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


    const handlePutDown = (e) => {
        console.log("handle put down called");
        let blockStatesTmp = props.blockStates
        blockStatesTmp = blockStatesTmp.map(() => {
            return false
        })
        blockStatesTmp[index] = true
        props.setblockStates(blockStatesTmp)
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
                />
                <input
                    type="text"
                    className={chineseInput}
                    placeholder={chinesePlaceHolder}
                />
            </div>
                <WordExplain
                ifPutDown={props.blockStates[index]}
                ></WordExplain>
        </div>
    )
}
export default WordBlock
