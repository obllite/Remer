import React from 'react';
import Avator from "./Avator"
import "../css/Navbar.scss"
//TODO 实现导航栏
class Navbar extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        this.state = {
            CSSclass: {
                navbar: "navbar"
            },
        }
    }
    render() {
        return (
            <div className={this.state.CSSclass.navbar}>
                <Avator></Avator>
            </div>
        )
    }
}

export default Navbar