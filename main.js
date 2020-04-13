// Modules to control application life and create native browser window
const {
    app,
    BrowserWindow,
    ipcMain,
    dialog
} = require("electron");
const path = require("path");
const fs = require("fs")

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 1000,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
            /* webSecurity: false */
        }
    })

    // and load the index.html of the app.
    //mainWindow.loadFile('index.html')
    mainWindow.loadURL('http://localhost:3000/');
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Main process ipc

/* FUNCTION handler changeAvatorFile: 更换用户头像 */
/* FIXME 存在没有调用的dialog， 可以删除然后重新封装async函数 */
ipcMain.on('changeAvatorFile-send', async (event, arg) => {
    //stateCode 值
    //console.log(arg)
    //init changeSuc changeFail changeCancel
    let stateCode = "changeSuc";
    await dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections']
    })
        .then((value) => {
            if (value.canceled) {
                stateCode = "changeCancel"
            } else {
                fs.copyFile(value.filePaths[0], './src/img/avactor.jpg', (err) => {
                    if (err) {
                        stateCode = "changeFail";
                        throw err;
                    }
                });

            }
        })
        .catch((e) => {
            console.log(e)
        })
        .finally(() => {
            console.log(stateCode)
            switch (stateCode) {
                case "changeFail":
                    stateCode = "更换头像失败";
                    break;
                case "changeCancel":
                    stateCode = "更换头像已取消";
                    break;
                case "changeSuc":
                    stateCode = "更换头像成功";
                    break;
                default:
                    break;
            }
            event.reply('changeAvatorFile-reply', stateCode)
        })
})
