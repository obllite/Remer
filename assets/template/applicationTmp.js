const main_process_utils = require('../../utils/index')
const mainProcess = require('../../main')

const appMenuTmp = [{
    label: 'Electron',
    submenu: [{
        label: '关于 Remer '
    }, {
        type: 'separator'
    }, {
        label: '偏好设置'
    }]
}, {
    label: '文件',
    submenu: [{
        label: '打开文件'
    }, {
        label: '打开最近的文件'
    }]
}, {
    label: '编辑',
    submenu: [{
        label: '恢复默认'
    }, {
        label: '撤销'
    }]
}, {
    label: '视图',
    submenu: [{
        label: '悬浮',
        id: 'setsuspended',
        accelerator: "Cmd+E",
        enabled: true,
        click: () => {
            main_process_utils.setSuspended(mainProcess.mainWindow)
        }
    }, {
        label: '取消悬浮',
        accelerator: "Cmd+D",
        id: 'cancelsuspended',
        enabled: false,
        click: () => {
            main_process_utils.cancelSuspended(mainProcess.mainWindow)
        }
    }, {
        type: 'separator'
    }]
}, {
    label: '导出',
    submenu: [{
        label: '导出markdown',
        //icon: ,
        accelerator: 'Cmd+M',
        click: () => {
            console.log(mainProcess.noteData)
            main_process_utils.exportMarkDown(mainProcess.noteData)
        }
    }, {
        label: '导出PDF',
        accelerator: 'Cmd+P',
        click: () => {
            console.log(mainProcess.mainWindow)
            main_process_utils.printPdfHandler(mainProcess.mainWindow)
        }
    }]
}, {
    label: '远程',
    submenu: [{
        label: '上传到服务器',
        click: () => {
            main_process_utils.uploadFileHandler()
        }
    }, {
        label: '从服务器下载',
        click: () => {
            main_process_utils.downloadFileHandler()
        }
    }, {
        label: '同步文件',
        click: () => {
            console.log("sync file called")
        }
    }]
}]

exports.appMenuTmp = appMenuTmp