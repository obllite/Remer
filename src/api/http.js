import axios from 'axios'
import emitter from '../utils/events';
import newNotifer from '../utils/notifier';

const serverURL = 'http://localhost:9090'
export const getNetWorkChack = async () => {
    try {
        const response = await axios.get(`${serverURL}/test`, {});
        console.log(response);
        let noticonfig = {
            head: "网 络 检 查",
            body: "网络连接正常!"
        };
        newNotifer(noticonfig);
        return true;
    }
    catch (error) {
        let noticonfig_1 = {
            head: "网 络 检 查",
            body: "网络连接已断开!"
        };
        newNotifer(noticonfig_1);
        return false;
    }
}

export default getNetWorkChack

export const getSignin = () => {
    // 为给定 ID 的 user 创建请求
    axios.get(`${serverURL}/sign`, {
        params: {
            username: 'Tachish'
        }
    })
        .then(function (response) {
            // 登陆成功
            // emit to remer config component
            if(response.data["UserName"]){
                console.log("sign data is: ",response.data)
                emitter.emit('signin-emit', response.data)
            }
        })
        .catch(function (error) {
            console.log(error.message);
            // 错误处理模块
            emitter.emit('signin-emit', "failed")
        });
}

export const getSignout = () => {
    //emit to remer 
    emitter.emit("signout-emit")
}