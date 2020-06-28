import React, { useRef, useState } from 'react'
import classnames from 'classnames'

function ProgressBar(props) {
    const progressCantainer = classnames('progressCantainer')
    const progressBar = classnames('progressBar')
    const progressBarName = classnames('progressBarName')
    const progressed = classnames('progressed')
    const unprogress = classnames('unprogress')
    const cancelTask = classnames('cancelTask')

    /* hooks */
    const progressedWidth = useRef([80, 50])
    const unprogressWidth = useRef([20, 50])
    /* hooks */
    const [tasks, settasks] = useState(props.tasks)
    /* functions */
    const cancelHandler = (index) => {
        console.log('index is ', index)
        let tasksTmp = [...tasks]
        progressedWidth.current.splice(index, 1)
        unprogressWidth.current.splice(index, 1)
        tasksTmp.splice(index, 1)
        console.log("cancel task", tasks, index, tasksTmp)
        settasks(tasksTmp)
    }


    return (
        <div className={progressCantainer}>
            {tasks.map((item, index) => {
                return (
                    <div className={progressBar} key={index}>
                        <div className={progressBarName}>
                            {item}
                        </div>
                        <div className={progressed} style={new progressedStyle(progressedWidth.current[index])}></div>
                        <div className={unprogress} style={new unprogressStyle(unprogressWidth.current[index])}></div>
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