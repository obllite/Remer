import React,{useState, useEffect}  from 'react';
import emitter from '../utils/events.js'
import classnames from 'classnames';
import { connect } from 'react-redux';
import animation from './loading'
//TODO 完成 worddetail 样式
//TODO 完成加载动画
//COMPONENT word detail 组件 显示搜索单词的结果
function Worddetail(props) {
    const worddetail = classnames('worddetail')
    const [status, setStatus] = useState("auto");
    useEffect(() => {
        //监听加载消息
        emitter.addListener('wrdetailoading-emit', (loading_type) => {
            setStatus(loading_type);
            console.log(animation);
            console.log("current loading type:");
            console.log(loading_type);
            console.log(status);
        })
        //监听加载完成消息
        emitter.addListener('wrdetailoaded-emit',()=>{
            console.log(props.wordContent)
            setStatus("auto");
            console.log("back to auto!");
        })
    },[])
    return status=="auto" ? (    
        <div className={worddetail}
            dangerouslySetInnerHTML={{ __html: props.wordContent }}>
        </div>) :
        <div className={worddetail} dangerouslySetInnerHTML={{__html: animation[status]}}></div>
    
}

const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps, null)(Worddetail)
