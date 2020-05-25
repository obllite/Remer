const mainProcess = require('../main')
function setSuspended(mainWindow) {
    mainProcess.appMenu.getMenuItemById('setsuspended').enabled = false
    mainProcess.appMenu.getMenuItemById('cancelsuspended').enabled = true
    mainWindow.setAlwaysOnTop(true, 'screen',1)
}

function cancelSuspended(mainWindow) {
    mainProcess.appMenu.getMenuItemById('cancelsuspended').enabled = false
    mainProcess.appMenu.getMenuItemById('setsuspended').enabled = true
    mainWindow.setAlwaysOnTop(false)
}
exports.setSuspended = setSuspended
exports.cancelSuspended = cancelSuspended