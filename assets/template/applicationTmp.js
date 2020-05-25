const main_process_utils = require('../../utils/index')
const mainProcess = require('../../main')
const appMenuTmp = [{
    label: 'Electron',
    submenu:[{
        label: '偏好设置'
    }]
},{
    label: '文件',
    submenu: [{
        label: '打开文件'
    }, {
        label: '打开最近的文件'
    }]
},{
    label: '编辑',
    submenu: [{
        label: '恢复默认'
    }, {
        label: '撤销'
    }]
},{
    label: '导出',
    submenu: [{
        label: '导出markdown',
        click: ()=>{
            console.log(mainProcess.noteData)
            main_process_utils.exportMarkDown(mainProcess.noteData)
        }
    },{
        label: '导出PDF',
        click: ()=>{
            console.log(mainProcess.mainWindow)
            main_process_utils.printPdfHandler(mainProcess.mainWindow)
        }
    }]
}]

exports.appMenuTmp = appMenuTmp