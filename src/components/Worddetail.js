import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
//TODO 完成 worddetail 样式
//TODO 完成加载动画
function Worddetail(props) {
    const worddetail = classnames('worddetail')
    return (
        <div
            className={worddetail}
            dangerouslySetInnerHTML={{ __html: props.wordContent }}
        >
        </div>
    )
}
const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps, null)(Worddetail)
