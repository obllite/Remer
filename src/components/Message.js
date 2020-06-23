import React from 'react'
import classnames from 'classnames';

function Message() {
    const messagePage = classnames('messagePage')
    return (
        <div className={messagePage}>
            this is message
        </div>
    )
}

export default Message