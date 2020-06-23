import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';

import Avator from './Avator'
import SwitchIcon from './SwitchIcon'
import Plan from './Plan';
import Message from './Message'
import Account from './Account'

import emitter from '../utils/events.js'
import newNotifier from '../utils/notifier'
import getNetWorkChack, { getSignout, getSignin } from '../api/http'

//COMPONENT 创建，打开，编辑 notebook 文件的组件
// 此处加载配置
//PARAMS concrete config = { type: enum['radio', 'anchor', 'btn','colorSelect'], value: any}

const bgc = '#65AD83'

const config = {
    profile: {
        username: '未 登 陆'
    },
    message: {
        messages: {
            type: 'anchor',
            alias: '我的消息',
            value: ''
        }
    },
    memory: {
        plan: {
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
    },
    log: {
        signin: {
            type: 'btn',
            alias: '用 户 登 陆',
            value: ''
        },
        signout: {
            type: 'btn',
            alias: '退 出 登 陆',
            value: ''
        }
    }
}
const configHandlers = {
    messages: () => {
        //加载message
        console.log("message is called")
    },
    plan: () => {
        //加载plan
        console.log('plan is called')
    },
    accountBind: () => {
        console.log('account bind called')
    },
    netWorkCheck: getNetWorkChack,
    signin: getSignin,
    signout: () => {
        console.log("sign out called")
        localStorage.setItem('ifSign', false)
        getSignout()
    }
}
function RemerConfig() {

    /* classnames */
    const remerConfig = classnames('remerConfig')
    const configContainer = classnames('configContainer')
    const profile = classnames('profile')
    const username = classnames('username')
    //concrete config
    const message = classnames('message', 'concreteConfig')
    const preference = classnames('preference', 'concreteConfig')
    const outlook = classnames('outlook', 'concreteConfig')
    const memory = classnames('memory', 'concreteConfig')
    const log = classnames('log', 'concreteConfig')

    const configli = classnames('configli')
    const configliSwitch = classnames('configliSwitch')
    const configIcon = classnames('configIcon', 'iconfont', 'arrow_right', 'icon-icon-test')

    /* hooks */
    const [profileState, setprofileState] = useState()
    const [messageState, setmessageState] = useState()
    const [memoryState, setmemoryState] = useState()
    const [preferenceState, setpreferenceState] = useState()
    const [outlookState, setoutlookState] = useState()
    const [logState, setlogState] = useState(false)

    //用 session 保持登陆会话
    const [ifSign, setifSign] = useState()
    // load config to state
    useEffect(() => {
        setprofileState(config.profile)
        setmessageState(config.message)
        setmemoryState(config.memory)
        setpreferenceState(config.preference)
        setoutlookState(config.outlook)
        setifSign(localStorage.getItem("ifSign"))
    }, [])

    useEffect(() => {
        if (!ifSign) {
            setlogState({
                signin: {
                    type: 'btn',
                    alias: '用 户 登 陆',
                    value: ''
                }
            })
        } else {
            setlogState({
                signout: {
                    type: 'btn',
                    alias: '退 出 登 陆',
                    value: ''
                }
            })
        }
    }, [ifSign])

    useEffect(() => {
        emitter.addListener('signin-emit', (data) => {
            //或许有错误码检查
            if (data === "failed") {
                newNotifier({ head: "登 陆 失 败", body: "用 户 登 陆 失 败" })
            } else {
                newNotifier({ head: "登 陆 成 功", body: "用 户 登 陆 成 功" })
                setifSign(true)
                setprofileState({ username: data["UserName"] })
                localStorage.setItem('ifSign', true)
            }
        })
        emitter.addListener("signout-emit", () => {
            //清除状态
            setifSign(false)
            setprofileState(config.profile)
        })
        return () => {
            emitter.removeListener('signin-emit', (data) => { })
        }
    }, [])
    /* consts */
    // config挂载对象, 用于实现 setState 函数的字典功能
    const configMountObj = {
        message: setmessageState,
        memory: setmemoryState,
        preference: setpreferenceState,
        outlook: setoutlookState,
        log: setlogState
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
        let callback = configHandlers[key]
        let content = el.alias ? el.alias : key.replace(/^\S/, s => s.toUpperCase())
        switch (el.type) {
            /* 单选框 */
            case 'radio':
                let rConfigli = classnames(configli, 'radio-configli')
                //此处换用复选框
                suffixNode = <SwitchIcon
                    key={key}
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
                ></SwitchIcon>
                leafNode = React.createElement('div', { key: key, className: rConfigli, value: el.value }, [content, suffixNode])
                break;
            /* 分页 */
            case 'anchor':
                let aConfigli = classnames(configli, 'anchor-configli')
                suffixNode = <div key={key} className={configIcon}></div>
                let routePath = '/config/' + key
                leafNode = <Link to={routePath} key={key}>
                    {
                        React.createElement('div', { key: key, className: aConfigli, value: el.value }, [content, suffixNode])
                    }
                </Link>
                break;
            /* 按钮 */
            case 'btn':
                let btnConfigli = classnames(configli, 'btn-configli')
                leafNode = React.createElement('div', { key: key, className: btnConfigli, value: el.value, onClick: callback }, content)
                break;
            /* 颜色选择 */
            case 'colorSelect':
                let cConfigli = classnames(configli, 'colorSelect-configli')
                suffixNode = <div key={key}></div>
                leafNode = React.createElement('div', { key: key, className: cConfigli, value: el.value }, [content, suffixNode])
                break;
            default:
                break;
        }
        return leafNode
    }
    return (
        <div className={remerConfig}>
            <div className={configContainer}>
                <div className={profile}>
                    <Avator></Avator>
                    <div className={username}>
                        {profileState ? profileState.username : ""}
                    </div>
                </div>
                {genConfigBlock(messageState, message)}
                {genConfigBlock(memoryState, memory)}
                {genConfigBlock(preferenceState, preference)}
                {genConfigBlock(outlookState, outlook)}
                {genConfigBlock(logState, log)}
            </div>
                <Switch>
                    <Route path='/config/messages'>
                        <Message></Message>
                    </Route>
                    <Route path='/config/plan'>
                        <Plan></Plan>
                    </Route>
                    <Route path='/config/accountBind'>
                    <Account></Account>
                    </Route>
                    <Redirect path="/config" to={{ pathname: '/config/plan' }} />
                </Switch>
        </div>
    )
}
export default RemerConfig