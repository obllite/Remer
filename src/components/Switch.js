import React, { useState, useEffect } from 'react'
import classnames from 'classnames'

/* PARAMS state: string enum('on' 或 'off'), onChange: function 用于改变state */
function Switch(props) {
    const {
        value,
        onChange,
        color,
        className
    } = props

    const switchContainer = classnames('switchContainer')
    const switchIcon = classnames('switchIcon')
    const on = classnames('switch-on')
    const off = classnames('switch-off')

    const switchHandler = () => {
        console.log("value is ", value)
        onChange()
    }
    return (
        <div
            className={value === 'on' ? classnames(switchContainer, className, on) : classnames(switchContainer, className,off)}
            onClick={switchHandler}
            style={{ backgroundColor: value === 'on' ? color :  "#dee2e6"}}
        >
            <div className={switchIcon}
            ></div>
        </div>
    )
}
export default Switch