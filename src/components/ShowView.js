import React from 'react'
/* import '../css/ShowView.scss' */
//COMPONENT 展示窗口组件 用于展示用户的主视图

class ShowView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            CSSclass: {
                showView: "showView"
            }
        }
    }
    render() {
        return (
            <div className={this.state.CSSclass.showView}>
            </div>
        )
    }
}

export default ShowView