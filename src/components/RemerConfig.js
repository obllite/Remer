import React, { useState, useEffect } from 'react'
import Avator from './Avator'
import Switch from './Switch'
import classnames from 'classnames'
//COMPONENT 创建，打开，编辑 notebook 文件的组件
// 此处加载配置
//PARAMS concrete config = { type: enum['radio', 'anchor', 'btn','colorSelect'], value: any}

const bgc = '#65AD83'
const config = {
    profile: {
        username: 'Tachish'
    },
    message: {
        messages: {
            type: 'anchor',
            alias: '我的消息',
            value: ''
        }
    },
    memory: {
        plane: {
            type: 'anchor',
            alias: '我的计划',
            value: ''
        }
    },
    preference: {
        netWorkCheck: {
            type: 'btn',
            alias: '网络检查',
            value: ''
        },
        localSync: {
            type: 'radio',
            alias: '本地同步',
            value: 'off'
        },
        remoteSync: {
            type: 'radio',
            alias: '远程同步',
            value: 'on'
        },
        accountBind: {
            type: 'anchor',
            alias: '账号绑定',
            value: 'a path to store file'
        }
    },
    outlook: {
        nightMode: {
            type: 'radio',
            alias: '夜间模式',
            value: 'on'
        },
        theme: {
            type: 'colorSelect',
            alias: '主题配色',
            value: 'green'
        }
    }
}
function RemerConfig() {
    /* classnames */
    const remerConfig = classnames('remerConfig')
    const profile = classnames('profile')
    const username = classnames('username')
    //concrete config
    const message = classnames('message', 'concreteConfig')
    const preference = classnames('preference', 'concreteConfig')
    const outlook = classnames('outlook', 'concreteConfig')
    const memory = classnames('memory', 'concreteConfig')

    const configli = classnames('configli')
    const configliSwitch = classnames('configliSwitch')
    const configIcon = classnames('configIcon','iconfont','arrow_right', 'icon-icon-test')

    /* hooks */
    const [profileState, setprofileState] = useState()
    const [messageState, setmessageState] = useState()
    const [memoryState, setmemoryState] = useState()
    const [preferenceState, setpreferenceState] = useState()
    const [outlookState, setoutlookState] = useState()
    // load config to state
    useEffect(() => {
        setprofileState(config.profile)
        setmessageState(config.message)
        setmemoryState(config.memory)
        setpreferenceState(config.preference)
        setoutlookState(config.outlook)
    }, [])

    /* consts */
    // config挂载对象, 用于实现 setState 函数的字典功能
    const configMountObj = {
        message: setmessageState,
        memory: setmemoryState,
        preference: setpreferenceState,
        outlook: setoutlookState
    }
    /* functions */
    const genConfigBlock = (concreteConfig, rootClassname) => {
        let childrenlis = []
        for (const key in concreteConfig) {
            if (concreteConfig.hasOwnProperty(key)) {
                const element = concreteConfig[key];
                let parentKey = rootClassname.split(" ")[0]
                let leafNode = genConfigli(key, element, parentKey)
                childrenlis.push(leafNode)
            }
        }
        // 挂载到根节点
        let rootNode = React.createElement('div', { className: rootClassname }, [...childrenlis])
        return rootNode
    }

    const genConfigli = (key, el, parentKey) => {
        let leafNode
        let suffixNode
        let callback = () => {
            console.log('btn is clicked')
        }
        let content = el.alias ? el.alias : key.replace(/^\S/, s => s.toUpperCase())
        switch (el.type) {
            /* 单选框 */
            case 'radio':
                let rConfigli = classnames(configli, 'radio-configli')
                //此处换用复选框
                suffixNode = <Switch
                    value={el.value}
                    className={configliSwitch}
                    color={bgc}
                    onChange={() => {
                        let tmpItem = config[parentKey]
                        if (tmpItem[key].value === 'off') {
                            tmpItem[key].value = 'on'
                        } else {
                            tmpItem[key].value = 'off'
                        }
                        configMountObj[parentKey]({ ...tmpItem })
                    }}
                ></Switch>
                leafNode = React.createElement('div', { key: key, className: rConfigli, value: el.value }, [content, suffixNode])
                break;
            /* 分页 */
            case 'anchor':
                let aConfigli = classnames(configli, 'anchor-configli')
                suffixNode = <div className={configIcon}></div>
                leafNode = React.createElement('div', { key: key, className: aConfigli, value: el.value }, [content, suffixNode])
                break;
            /* 按钮 */
            case 'btn':
                let btnConfigli = classnames(configli, 'btn-configli')
                leafNode = React.createElement('div', { key: key, className: btnConfigli, value: el.value, onClick: callback }, content)
                break;
            /* 颜色选择 */
            case 'colorSelect':
                let cConfigli = classnames(configli, 'colorSelect-configli')
                leafNode = React.createElement('div', { key: key, className: cConfigli, value: el.value }, [content, suffixNode])
                break;
            default:
                break;
        }
        return leafNode
    }
    return (
        <div className={remerConfig}>
            <div className={profile}>
                <Avator></Avator>
                <div className={username}>
                    {config.profile.username}
                </div>
            </div>
            {genConfigBlock(messageState, message)}
            {genConfigBlock(memoryState, memory)}
            {genConfigBlock(preferenceState, preference)}
            {genConfigBlock(outlookState, outlook)}
        </div>
    )
}
export default RemerConfig