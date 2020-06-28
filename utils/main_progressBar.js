const mainProcess = require('../main')

function createTask(taskName, sliceNum) {
    console.log("creating a task: ", taskName)
    mainProcess.mainWindow.webContents.send('progress-create', { taskName, sliceNum })
}

//PARAMS task 完成进度的百分比
function updateTask(taskName, num) {
    mainProcess.mainWindow.webContents.send('progress-update', { taskName, num })
}

exports.createTask = createTask
exports.updateTask = updateTask