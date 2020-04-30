import React, { useRef } from 'react'
import classnames from 'classnames'

function WordExplain(props) {

    const explainContainer = classnames('explainContainer')
    const wordExplain = classnames("wordExplain")
    const addExplain = classnames("addExplain")
    const meaning = classnames('meaning')
    const setCollection = classnames('setCollection')
    const indentation = classnames('indentation')

    const explainPlaceHolder = "Meaning"
    const setCollectionPlaceHolder = "Set Collection"

    const Meaning = (
        <div className={wordExplain}>
            <div
                className={addExplain}
                onClick={(e) => { addMeaning(e) }}
            >+</div>
            <input
                type="text"
                className={meaning}
                placeholder={explainPlaceHolder}
            />
        </div>
    )
    const Explain = (
        <ul>
            <li className={wordExplain}>
                <div
                    className={addExplain}
                    onClick={(e) => { addSetCollection(e) }}
                >+</div>
                <input
                    type="text"
                    className={setCollection}
                    placeholder={setCollectionPlaceHolder}
                />
            </li>
        </ul>
    )

    const addMeaning = (e, explainContainerRef) => {
        e.nativeEvent.stopImmediatePropagation();
        console.log('add meaning', explainContainerRef);

    }
    const addSetCollection = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        console.log("add set collection");
    }
    return (
        <ul
            className={explainContainer}
        >
            <li>
                {Meaning}
                {Explain}
            </li>
        </ul>
    )
}

export default WordExplain