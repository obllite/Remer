/* PARAMS config = {head: str, body: str} */
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