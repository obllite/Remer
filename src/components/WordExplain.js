import React, { useRef } from 'react'
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


    //meaning collections init obj
    const meaningInit = {
        meaning: '',
        collections: ['']
    }
    const inputInit = {
        refList: []
    }
    //hooks
    const newCollectionIndex = useRef({
        index_m: -1,
        index_c: -1
    })
    const inputRefList = useRef([{
        refList: []
    }])
    //inner handler
    const addMeaning = (e, index) => {
        e.nativeEvent.stopImmediatePropagation();
        props.meanings.splice(index + 1, 0, meaningInit)
        props.setmeanings(props.meanings)
    }

    const addSetCollection = (e, index_m, index_c) => {
        //console.log(index_m, index_c)
        //console.log("key code ", e.keyCode)
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
                    inputRefList.current[index_m].refList[index_c - 1].focus()
                    setTimeout(() => {
                        inputRefList.current[index_m].refList[index_c - 1].setSelectionRange(-1, -1)
                    }, 0);
                }
                if (index_c - 1 === -1) {
                    props.meaningRefList[index_m].focus()
                    setTimeout(() => {
                        props.meaningRefList[index_m].setSelectionRange(-1, -1)
                    }, 0);
                }
                break;
            //down    
            case 40:
                if (index_c + 1 < inputRefList.current[index_m].refList.length) {
                    inputRefList.current[index_m].refList[index_c + 1].focus()
                    setTimeout(() => {
                        inputRefList.current[index_m].refList[index_c + 1].setSelectionRange(-1, -1)
                    }, 0);
                }
                if (index_c + 1 === inputRefList.current[index_m].refList.length && inputRefList.current[index_m + 1] !== undefined) {
                    props.meaningRefList[index_m + 1].focus();
                    setTimeout(() => {
                        props.meaningRefList[index_m + 1].setSelectionRange(-1, -1)
                    }, 0);
                }
                break;
            // right
            case 39:
                if (inputRefList.current[index_m].refList[index_c].selectionStart === inputRefList.current[index_m].refList[index_c].value.length) {
                    if (index_c + 1 < inputRefList.current[index_m].refList.length) {
                        inputRefList.current[index_m].refList[index_c + 1].focus()
                        setTimeout(() => {
                            inputRefList.current[index_m].refList[index_c + 1].setSelectionRange(-1, -1)
                        }, 0);
                    }
                    if (index_c + 1 === inputRefList.current[index_m].refList.length && inputRefList.current[index_m + 1] !== undefined) {
                        props.meaningRefList[index_m + 1].focus();
                        setTimeout(() => {
                            props.meaningRefList[index_m + 1].setSelectionRange(-1, -1)
                        }, 0);
                    }
                }
                break;
            //left
            case 37:
                if (inputRefList.current[index_m].refList[index_c].selectionStart === 0) {
                    if (index_c - 1 > -1) {
                        inputRefList.current[index_m].refList[index_c - 1].focus()
                        setTimeout(() => {
                            inputRefList.current[index_m].refList[index_c - 1].setSelectionRange(-1, -1)
                        }, 0);
                    }
                    if (index_c - 1 === -1) {
                        props.meaningRefList[index_m].focus()
                        setTimeout(() => {
                            props.meaningRefList[index_m].setSelectionRange(-1, -1)
                        }, 0);
                    }
                }
                break;
            //enter
            case 13:
                props.setmeanings(props.meanings.map((item, i) => {
                    if (i === index_m) {
                        item.collections.splice(index_c + 1, 0, '')
                    }
                    return item
                }))
                console.log(index_m, index_c)
                newCollectionIndex.current.index_m = index_m
                newCollectionIndex.current.index_c = index_c + 1
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
                if (index_m - 1 < 0) {
                    return
                }
                let length = inputRefList.current[index_m - 1].refList.length;
                inputRefList.current[index_m - 1].refList[length - 1].focus()
                setTimeout(() => {
                    inputRefList.current[index_m - 1].refList[length - 1].setSelectionRange(-1, -1)
                }, 0);
                break;
            //down    
            case 40:
                inputRefList.current[index_m].refList[0].focus()
                setTimeout(() => {
                    inputRefList.current[index_m].refList[0].setSelectionRange(-1, -1)
                }, 0);
                break;
            case 39:
                inputRefList.current[index_m].refList[0].focus()
                setTimeout(() => {
                    inputRefList.current[index_m].refList[0].setSelectionRange(-1, -1)
                }, 0);
                break;
            default:
                break
        }
        if (e.keyCode === 13) {
            inputRefList.current[index_m].refList[0].focus()
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
        !props.meanings ? <div></div> :
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
                                            props.meaningRefList.splice(index_m, 0, meaning)
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
                                                        if (input) {
                                                            if (inputRefList.current[index_m] === undefined) {
                                                                inputRefList.current.push(inputInit)
                                                                console.log("push into inputRefList", inputRefList)
                                                            }
                                                            if(inputRefList.current[index_m].refList.length <= index_c) {
                                                                inputRefList.current[index_m].refList.splice(index_c, 0, input)
                                                            }
                                                            if (newCollectionIndex.current.index_m === index_m && newCollectionIndex.current.index_c === index_c) {
                                                                input.focus()
                                                                newCollectionIndex.current.index_m = -1
                                                                newCollectionIndex.current.index_c = -1
                                                            }
                                                        }
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