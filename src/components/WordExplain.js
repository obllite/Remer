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
    //meaning collections init obj
    const meaningInit = {
        meaning:'',
        collections:['']
    }
    //states
    const [meanings, setmeanings] = useState([{
        meaning: 'test',
        collections: ['', '']
    },{
        meaning:'dictionary',
        collections:['字典']
    }])
    //inner handler
    const addMeaning = (e, index) => {
        e.nativeEvent.stopImmediatePropagation();
        meanings.splice(index+1,0,meaningInit)
        setmeanings(meanings)
    }

    const addSetCollection = (e,index_m,index_c) => {
        console.log(index_c);
        e.nativeEvent.stopImmediatePropagation();
        setmeanings(meanings.map((item, i)=>{
            if (i === index_m){
                item.collections.splice(i+1,0,'')
            }
            return item
        }))
    }

    const handleMeaningChange = (e, item, index) => {
        console.log('constent is ', item.meaning)
        setmeanings(meanings.map((element, i) => {
            if (i === index) {
                element = { ...element, [meaning]: e.target.value }
            }
            return element
        }))
    }

    const handelSetColectionChange = (e, index_m,index_c) => {
        console.log('onchange is called');
        setmeanings(meanings.map((element, i) => {
            if(i === index_m) {
                let new_collections = element.collections
                new_collections[index_c] = e.target.value;
                element = Object.assign(element,{collections:new_collections})
            }
            return element
        }))
    }
    return (
        <ul
            className={explainContainer}
        >
            {
                meanings.map((item_m, index_m) => {
                    return (
                        <li key={index_m}>
                            <div className={wordExplain}>
                                <div
                                    className={addExplain}
                                    onClick={(e) => { addMeaning(e,index_m) }}
                                >+</div>
                                <input
                                    type="text"
                                    className={meaning}
                                    placeholder={explainPlaceHolder}
                                    value={item_m.meaning}
                                    onChange={(e) => { handleMeaningChange(e, item_m, index_m) }}
                                />
                            </div >
                            <ul>
                                {item_m.collections.map((item_c, index_c) => {
                                    return (
                                        <li className={wordExplain} key={index_c}>
                                            <div
                                                className={addExplain}
                                                onClick={(e) => { addSetCollection(e,index_m,index_c) }}
                                            >+</div>
                                            <input
                                                type="text"
                                                className={setCollection}
                                                placeholder={setCollectionPlaceHolder}
                                                value={item_c}
                                                onChange={(e) => { handelSetColectionChange(e,index_m,index_c) }}
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default WordExplain