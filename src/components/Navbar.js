import React from 'react';
//import Avator from "./Avator"
import Navitem from "./Navitem"
/* import "../css/Navbar.scss" */
//COMPONENT 导航栏组件

class Navbar extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        this.state = {
            CSSclass: {
                navbar: "navbar",
                avatorCircle: "avatorCircle",
                logoTop: "logoTop",
                logoBottom: "logoBottom"
            },
        }
    }
    render() {
        return (
            <div className={this.state.CSSclass.navbar}>
{/*                 <div className={this.state.CSSclass.avatorCircle}>
                    <Avator></Avator>
                </div> */}

                <Navitem></Navitem>
            </div>
        )
    }
}

export default Navbar