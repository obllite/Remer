import React, { useState } from 'react'
import classnames from 'classnames'
//COMPONENT word explain 组件，编辑单词的详细意思和固定搭配

//FIXME 使用自定义hook 完成添加input auto focus
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
    const meaningRefList = []

    //meaning collections init obj
    const meaningInit = {
        meaning: '',
        collections: ['']
    }
    const inputInit = {
        refList:[]
    }
    //hooks

    //inner handler
    const addMeaning = (e, index) => {
        e.nativeEvent.stopImmediatePropagation();
        props.meanings.splice(index + 1, 0, meaningInit)
        props.setmeanings(props.meanings)
    }

    const addSetCollection = (e, index_m, index_c) => {
        e.nativeEvent.stopImmediatePropagation();
        if (e.keyCode === undefined) {
            props.setmeanings(props.meanings.map((item, i) => {
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
                    props.inputRefList[index_m].refList[index_c - 1].focus()
                    setTimeout(() => {
                        props.inputRefList[index_m].refList[index_c - 1].setSelectionRange(-1, -1)
                    }, 0);
                }
                if (index_c - 1 === -1) {
                    meaningRefList[index_m].focus()
                    setTimeout(() => {
                        meaningRefList[index_m].setSelectionRange(-1,-1)
                    }, 0);
                }
                break;
            //down    
            case 40:
                if (index_c + 1 < props.inputRefList[index_m].refList.length) {
                    props.inputRefList[index_m].refList[index_c + 1].focus()
                    setTimeout(() => {
                        props.inputRefList[index_m].refList[index_c + 1].setSelectionRange(-1, -1)
                    }, 0);
                }
                if (index_c + 1 === props.inputRefList[index_m].refList.length && props.inputRefList[index_m + 1] !== undefined) {
                    meaningRefList[index_m + 1].focus();
                    setTimeout(() => {
                        meaningRefList[index_m + 1].setSelectionRange(-1,-1)
                    }, 0);
                }
                break;
            case 13:
                props.setmeanings(props.meanings.map((item, i) => {
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
        props.setmeanings(props.meanings.map((element, i) => {
            if (i === index) {
                element = { ...element, [meaning]: e.target.value }
            }
            return element
        }))
    }
    const handleMeaning2focus = (e, index_m) => {
        switch (e.keyCode) {
            case 38:
                if(index_m - 1 < 0) {
                    return 
                }
                let length = props.inputRefList[index_m - 1].refList.length;
                props.inputRefList[index_m - 1].refList[length - 1].focus()
                setTimeout(() => {
                    props.inputRefList[index_m - 1].refList[length - 1].setSelectionRange(-1, -1)
                }, 0);
                break;
            //down    
            case 40:
                props.inputRefList[index_m].refList[0].focus()
                setTimeout(() => {
                    props.inputRefList[index_m].refList[0].setSelectionRange(-1, -1)
                }, 0);
                break;
            default:
                break
        }
        if (e.keyCode === 13) {
            props.inputRefList[index_m].refList[0].focus()
        }
    }
    const handelSetColectionChange = (e, index_m, index_c) => {
        props.setmeanings(props.meanings.map((element, i) => {
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
                props.meanings.map((item_m, index_m) => {
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
                                        handleMeaning2focus(e, index_m)
                                    }}
                                    ref={meaning => {
                                        meaningRefList.splice(index_m, 0, meaning)
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
                                                    if(props.inputRefList[index_m] === undefined) {
                                                        props.inputRefList.push(inputInit)
                                                    }
                                                    props.inputRefList[index_m].refList.splice(index_c, 0, input)
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