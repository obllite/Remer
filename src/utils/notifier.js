/* PARAMS config = {head: str, body: str} */
// TODO 实现通知列表, 将所以notfier 全部封装到此文件中
const newNotifier = (config) => {
    let notifier = new Notification(config.head, {
        body: config.body
    })
    if(config.callback) {
        notifier.onclick = config.callback
    }
    return notifier
}
export default newNotifier