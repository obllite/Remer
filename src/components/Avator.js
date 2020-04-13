import React from "react"
import avatorURL from "../img/avactor.jpg"
import "../css/Avator.scss"
import changeAvator from '../utils/changeAvator'

/* COMPONENT 用户头像组件*/
/* FIXME 更换avator img 之后会导致页面刷新,可能是由于 setTimeout 产生的异步事件导致的 */
/* TODO 样式可以重构以复用 */

class Avator extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        this.state = {
            CSSclass: {
                avator: "avator",
                userSign: "userSign",
                avatorBox: "avatorBox",
                changeButton: "changeButton",
                imgBlur: "imgBlur",
                imgLegible: "imgLegible",
            },
            ifLegible: true
        }
    }
    componentDidMount() {
    }

    render() {
        return (
            <div className={this.state.CSSclass.avator}>
                <div className={this.state.CSSclass.avatorBox}
                    onMouseEnter={this.toBlur}
                    onMouseLeave={this.toLegible}>
                    <img
                        src={avatorURL}
                        alt="userAvator"
                        className={this.state.ifLegible ? this.state.CSSclass.imgLegible : this.state.CSSclass.imgBlur} />
                    <div
                        className={this.state.CSSclass.changeButton}
                        style={{ display: this.state.ifLegible ? "none" : "block" }}
                        onClick={changeAvator}>更换头像</div>
                </div>
            </div>
        )
    }
    toBlur = (e) => {
        let timer = setTimeout(() => {
            this.setState({ ifLegible: false })
            clearTimeout(timer)
        }, 1000);
    }
    toLegible = (e) => {
        this.setState({ ifLegible: true })
    }
}
export default Avator