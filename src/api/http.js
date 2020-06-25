import axios from 'axios'
import emitter from '../utils/events';
const serverURL = 'http://localhost:9090'
export const getNetWorkChack = () => {
    axios.get(`${serverURL}/test`, {
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
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
            console.log(error);
            //emit to Notification module
            emitter.emit('signin-emit', "failed")
        });
}

export const getSignout = () => {
    //emit to remer 
    emitter.emit("signout-emit")
}