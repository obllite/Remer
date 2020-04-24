import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
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
