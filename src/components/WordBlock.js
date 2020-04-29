import React, { useState, useEffect } from 'react'
import classnames from 'classnames'

function WordBlock(props) {
    const {
        index,
        ifShowDetail,
    } = props
    const wordBlock = classnames('wordBlock')
    const wordCount = classnames('wordCount')
    const englishInput = classnames('englishInput')
    const chineseInput = classnames('chineseInput')
    const inputContainer = classnames('inputContainer')
    const wordExplain = classnames("wordExplain")

    const englishPlaceHolder = "Input English"
    const chinesePlaceHolder = "Input Chinese"

    const [showFlag, setshowFlag] = useState(ifShowDetail)

    const handlePutDown = (e) => {
        console.log("handle put down called");
        setshowFlag(true)
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
                <div className={wordCount}>{index+1}</div>
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
            {showFlag ?
                <div className={wordExplain}>
                    <div>+</div>
                    <input type="text"/>
                    <input type="text"/>
                    <div>^</div>
                </div>
                : <></>}
        </div>
    )
}
export default WordBlock
