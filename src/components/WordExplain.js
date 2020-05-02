import React, { useState, useRef } from 'react'
import classnames from 'classnames'

function WordExplain(props) {
//classnames
    const explainContainer = classnames('explainContainer')
    const wordExplain = classnames("wordExplain")
    const addExplain = classnames("addExplain")
    const meaning = classnames('meaning')
    const setCollection = classnames('setCollection')
//const
    const explainPlaceHolder = "Meaning"
    const setCollectionPlaceHolder = "Set Collection"
//states
    const [explains, setexplains] = useState(['',''])
//innet handler
    const addMeaning = (e, explainContainerRef) => {
        e.nativeEvent.stopImmediatePropagation();
        console.log('add meaning', explainContainerRef);
        //explains.push(setCollectionInit)
    }
    const addSetCollection = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        setexplains([...explains,''])
    }
    const handelSetColectionChange = (e, index) => {
        console.log('onchange is called');
        let target = e.target.value;
        setexplains(explains.map((item,i) => {
            if (i === index) {
                item = target
            }
            console.log('item is ', item);
            console.log('index is ', index);
            console.log(explains)
            return item
        }))
    }
//inner jsx obj
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
            {explains.map((item, index) => {
                return (
                    <li className={wordExplain} key={index}>
                        <div
                            className={addExplain}
                            onClick={(e) => { addSetCollection(e) }}
                        >+</div>
                        <input
                            type="text"
                            className={setCollection}
                            placeholder={setCollectionPlaceHolder}
                            value={item}
                            onChange={(e)=>{handelSetColectionChange(e,index)}}
                        />
                    </li>
                )
            })}
        </ul>
    )
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