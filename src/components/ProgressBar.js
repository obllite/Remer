import React, { useRef, useState, useEffect } from 'react'
import classnames from 'classnames'

function ProgressBar(props) {
    const progressCantainer = classnames('progressCantainer')
    const progressBar = classnames('progressBar')
    const progressBarName = classnames('progressBarName')
    const progressed = classnames('progressed')
    const unprogress = classnames('unprogress')
    const cancelTask = classnames('cancelTask')

    /* hooks */
    const [tasks, settasks] = useState([])
    const [progressedWidth, setprogressedWidth] = useState([])
    const [unprogressWidth, setunprogressWidth] = useState([])
    const [sliceNums, setsliceNums] = useState([])
    useEffect(() => {
        let isMounted = true
        //TODO 添加task listener
        if (window.ipcRenderer && isMounted) {
            window.ipcRenderer.on('progress-create', (event, taskInfo) => {
                let { taskName, sliceNum } = taskInfo
                if (isMounted) {
                    console.log(tasks.includes(taskName))
                    if (!tasks.includes(taskName)) {
                        console.log("creata task: ", taskName)
                        // task不存在, 返回允许创建task
                        // TODO 封装为自定义hook
                        let sliceNumTmp = sliceNums
                        sliceNumTmp.push(sliceNum)
                        setsliceNums(sliceNumTmp)
                        let progressedWidthTmp = progressedWidth
                        progressedWidthTmp.push(0)
                        setprogressedWidth([...progressedWidthTmp])
                        let unprogressWidthTmp = unprogressWidth
                        unprogressWidthTmp.push(100)
                        setunprogressWidth([...unprogressWidthTmp])
                        let taskTmp = tasks
                        taskTmp.push(taskName)
                        settasks([...taskTmp])

                    } else {
                        // task 存在, 返回错误处理, 取消创建task
                    }
                }
            })

            window.ipcRenderer.on('progress-update', (event, taskInfo) => {
                let { taskName, num: updateNum } = taskInfo
                if (isMounted) {
                    console.log(tasks.indexOf(taskName))
                    if (tasks.indexOf(taskName) > -1) {
                        let tid = tasks.indexOf(taskName)
                        console.log('update task:', taskName, 'tid is:', tid)
                        // 计算 task 完成的百分比
                        let percentage = calcPercent(sliceNums[tid], updateNum)
                        let progressedWidthTmp = progressedWidth
                        progressedWidthTmp[tid] += percentage
                        setprogressedWidth([...progressedWidthTmp])
                        let unprogressWidthTmp = unprogressWidth
                        unprogressWidthTmp[tid] -= percentage
                        setunprogressWidth([...unprogressWidthTmp])
                    } else {
                        // task 存在, 返回错误处理, 取消创建task
                    }
                }
            })
        }
        return () => {
            isMounted = false
        }
    }, [])
    /* functions */
    const calcPercent = (total, part) => {
        console.log("total is",total)
        console.log('part is', part)
        console.log('percent is:', part/total *100)
        return part/total *100
    }

    const cancelHandler = (index) => {
        console.log('index is ', index)
        let sliceNumsTmp = sliceNums
        sliceNumsTmp.splice(index, 1)
        setsliceNums(sliceNumsTmp)

        let progressedWidthTmp = progressedWidth
        progressedWidthTmp.splice(index, 1)
        setsliceNums(progressedWidthTmp)
        
        let unprogressWidthTmp = unprogressWidth
        unprogressWidthTmp.splice(index, 1)
        setsliceNums(unprogressWidthTmp)
        unprogressWidth.splice(index, 1)

        let tasksTmp = [...tasks]
        tasksTmp.splice(index, 1)
        settasks(tasksTmp)
        console.log("cancel task", tasks, index, tasksTmp)
    }


    return (
        <div className={progressCantainer}>
            {tasks.map((item, index) => {
                return (
                    <div className={progressBar} key={index}>
                        <div className={progressBarName}>
                            {item}
                        </div>
                        <div className={progressed} style={new progressedStyle(progressedWidth[index])}></div>
                        <div className={unprogress} style={new unprogressStyle(unprogressWidth[index])}></div>
                        <div className={cancelTask} onClick={() => { cancelHandler(index) }}>∆</div>
                    </div>
                )
            })}
        </div>
    )
}


class progressedStyle {
    constructor(width) {
        this.width = width + '%'
    }
}

class unprogressStyle {
    constructor(width) {
        this.width = width + '%'
    }
}
export default ProgressBar