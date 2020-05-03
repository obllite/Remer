import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
//COMPONENT word explain 组件，编辑单词的详细意思和固定搭配
function WordExplain(props) {
    //classnames
    const explainContainer = classnames('explainContainer')
    const wordExplain = classnames("wordExplain")
    const addExplain = classnames("addExplain")
    const meaning = classnames('meaning')
    const setCollection = classnames('setCollection')
    const hideClass = classnames('hide')
    //const
    const explainPlaceHolder = "Meaning"
    const setCollectionPlaceHolder = "Set Collection"
    const inputRefList = []
    //meaning collections init obj
    const meaningInit = {
        meaning: '',
        collections: ['']
    }
    //hooks
    const [meanings, setmeanings] = useState([{
        meaning: '',
        collections: ['']
    }])
    //inner handler
    const addMeaning = (e, index) => {
        e.nativeEvent.stopImmediatePropagation();
        meanings.splice(index + 1, 0, meaningInit)
        setmeanings(meanings)
    }

    const addSetCollection = (e, index_m, index_c) => {
        e.nativeEvent.stopImmediatePropagation();
        if (e.keyCode === undefined) {
            setmeanings(meanings.map((item, i) => {
                if (i === index_m) {
                    item.collections.splice(index_c + 1, 0, '')
                }
                return item
            }))
        }
        switch (e.keyCode) {
            //up
            case 38:
                if (index_c - 1 > -1) {
                    inputRefList[index_c - 1].focus()
                    setTimeout(() => {
                        inputRefList[index_c - 1].setSelectionRange(-1,-1)
                    }, 0);
                }
                break;
            //down    
            case 40:
                if (index_c + 1 < inputRefList.length) {
                    inputRefList[index_c + 1].focus()
                    setTimeout(() => {
                        inputRefList[index_c + 1].setSelectionRange(-1,-1)
                    }, 0);
                }
                break;
            case 13:
                setmeanings(meanings.map((item, i) => {
                    if (i === index_m) {
                        item.collections.splice(index_c + 1, 0, '')
                    }
                    return item
                }))
                break;
            default:
                break;
        }
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
    const handleMeaning2focus = (e) => {
        if (e.keyCode === 13) {
            inputRefList[0].focus()
        }
    }
    const handelSetColectionChange = (e, index_m, index_c) => {
        console.log('onchange is called');
        setmeanings(meanings.map((element, i) => {
            if (i === index_m) {
                let new_collections = element.collections
                new_collections[index_c] = e.target.value;
                element = Object.assign(element, { collections: new_collections })
            }
            return element
        }))
    }
    return (
        <ul
            className={props.ifPutDown ? explainContainer : hideClass}
        >
            {
                meanings.map((item_m, index_m) => {
                    return (
                        <li key={index_m}>
                            <div className={wordExplain}>
                                <div
                                    className={addExplain}
                                    onClick={(e) => { addMeaning(e, index_m) }}
                                >+</div>
                                <input
                                    type="text"
                                    className={meaning}
                                    placeholder={explainPlaceHolder}
                                    value={item_m.meaning}
                                    onChange={(e) => { handleMeaningChange(e, item_m, index_m) }}
                                    onKeyDown={(e) => {
                                        handleMeaning2focus(e)
                                    }}
                                />
                            </div >
                            <ul>
                                {item_m.collections.map((item_c, index_c) => {
                                    return (
                                        <li className={wordExplain} key={index_c}>
                                            <div
                                                className={addExplain}
                                                onClick={(e) => { addSetCollection(e, index_m, index_c) }}
                                            >+</div>
                                            <input
                                                type="text"
                                                className={setCollection}
                                                placeholder={setCollectionPlaceHolder}
                                                value={item_c}
                                                onChange={(e) => { handelSetColectionChange(e, index_m, index_c) }}
                                                onKeyDown={(e) => { addSetCollection(e, index_m, index_c) }}
                                                //autoFocus={true}
                                                ref={input => {
                                                    inputRefList.splice(index_c, 0, input)
                                                }}
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