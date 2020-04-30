import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import WordExplain from './WordExplain'

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

    const addMeaning = (e, explainContainerRef) => {
        e.nativeEvent.stopImmediatePropagation();
        console.log('add meaning', explainContainerRef);

    }
    const addSetCollection = (e)=>{
        e.nativeEvent.stopImmediatePropagation();
        console.log("add set collection");
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
            {props.blockStates[index] ?
                <WordExplain
                ></WordExplain>
                : <></>}
        </div>
    )
}
export default WordBlock
