import React from 'react'
import classnames from 'classnames'

/* PARAMS state: string enum('on' 或 'off'), onChange: function 用于改变state */
function SwitchIcon(props) {
    const {
        value,
        onChange,
        color,
        className,
        preprocess
    } = props

    const switchContainer = classnames('switchContainer')
    const switchIcon = classnames('switchIcon')
    const on = classnames('switch-on')
    const off = classnames('switch-off')

    const switchHandler = async () => {
        console.log("value is ", value)
        let result = await preprocess()
        console.log("result is ", result)
        if (result) {
            onChange()
        }
    }
    return (
        <div
            className={value === 'on' ? classnames(switchContainer, className, on) : classnames(switchContainer, className, off)}
            onClick={switchHandler}
            style={{ backgroundColor: value === 'on' ? color : "#dee2e6" }}
        >
            <div className={switchIcon}
            ></div>
        </div>
    )
}
export default SwitchIcon