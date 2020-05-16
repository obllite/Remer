// Modules to control application life and create native browser window
const {
    app,
    BrowserWindow,
    ipcMain,
    dialog,
    Menu,
    MenuItem
} = require("electron");

const path = require("path");
const editCachePath = path.join(__dirname, "/noteBooks/editBlockCache.json")
const fs = require("fs");
let main_process_utils = null;
let lastViewedFilePath = ''
//Menu


//http URL definition
const httpURlCollins = "https://www.collinsdictionary.com/zh/dictionary/english/";
const httpQue = [httpURlCollins];

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 740,
        minWidth: 400,
        alwaysOnTop: true,
        //icon: path.join(__dirname, 'assets/images/sakurajima.jpg'),
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
            /* webSecurity: false */
        }
    })

    if (process.platform === 'darwin') {
        app.dock.setIcon(path.join(__dirname, 'assets/images/sakurajima.jpg'));
    }
    // and load the index.html of the app.
    //mainWindow.loadFile('index.html')
    mainWindow.loadURL('http://localhost:3000/');
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    //导入所有所需的模块
    loadUtils()
    main_process_utils.initFileViewInfo()
    createWindow()
})
app.on('browser-window-created', (event, win) => {

})
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

function loadUtils() {
    const file = path.join(__dirname, 'utils/index.js')
    main_process_utils = require(file)
}

// Main process ipc

/* TODO 封装 new Menu，创建 listener 以及 arg 接口的参数类型 */
ipcMain.on('show-context-menu', (event, arg) => {
    //console.log(event)
})
/* HOOK handler changeAvatorFile: 更换用户头像 */
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

/* HOOK handler searchHandler: 搜索单词 */
//TODO 完成所有的http params
ipcMain.on('searchWord-send', async (event, arg) => {
    let wordHeader = `<h1>${arg}</h1>`
    const content = await main_process_utils.searchWord(arg, httpQue)
    event.reply('searchWord-reply', wordHeader += content)
})
//TODO 使用异步函数将cache与实际的file同步
/* HOOK handler saveEditBlocks：将edit 区域的数据存入 notebooks/CeditBlockache.json */
ipcMain.on('saveEditBlocks-send', (event, arg) => {
    let blocksDataJson = {}
    for (let i = 0; i < arg.length; i++) {
        let serial = 'block#' + i;
        blocksDataJson[serial] = arg[i]
    }
    blocksDataJson = JSON.stringify(blocksDataJson)
    //console.log('blocksDataJson is --->', blocksDataJson)
    let writeLength = blocksDataJson.length
    main_process_utils.saveEditBlocks(blocksDataJson,lastViewedFilePath,(filePath)=>{
        filePath = path.join(__dirname,lastViewedFilePath)
        //NOTE 可以通过是否同步来检查文件是否保存
        main_process_utils.syncCacheToFile(editCachePath,filePath)
    })
    //NOTE 用于实现进度条
    event.reply('saveEditBlocks-reply', writeLength)
})

/* HOOK handler handleNewFile： file view 新建notebook 下文件 */
ipcMain.on('newFile-send', (event, arg) => {
    let ifNewFileSuc = main_process_utils.newFile(arg)
    event.reply('newFile-reply', ifNewFileSuc)
})

/* HOOK handler loadFileViewInfo 加载 fileView 数据 */
ipcMain.on('loadFileViewInfo-send', (event, arg) => {
    let fileViewInfo = main_process_utils.fileViewInfo
    if(lastViewedFilePath) {
        let splitFilePath = lastViewedFilePath.split('/')
        let lastViewedFile  = splitFilePath.pop()
        let lastViewedNoteBook = splitFilePath.pop()
        console.log('lastViewFile is', lastViewedFile)
        fileViewInfo.lastViewedFile = lastViewedFile
        fileViewInfo.lastViewedNoteBook = lastViewedNoteBook
    }
    event.reply('loadFileViewInfo-reply', fileViewInfo)
})

/* HOOK 加载 load edit cache */
ipcMain.on('loadEditCache-send', (event, arg) => {
    let filedata
    if (lastViewedFilePath) {
        let rollbackFilePath = path.join(__dirname, lastViewedFilePath)
        main_process_utils.readNoteBookFile(rollbackFilePath, filedata, event, (event, filedata) => {
            filedata = JSON.parse(filedata.toString('utf-8'))
            event.reply('loadEditCache-reply', filedata)
        })
    } else {
        let initPath = path.join(__dirname, main_process_utils.getDefaultFilePath())
        main_process_utils.readNoteBookFile(initPath, filedata, event, (event, filedata) => {
            filedata = JSON.parse(filedata.toString('utf-8'))
            event.reply('loadEditCache-reply', filedata)
        })
    }
})

/* HOOK 加载 noteBook file */
ipcMain.on('loadfile-send', (event, filePath) => {
    filePath = path.join(__dirname, filePath)
    let filedata
    main_process_utils.readNoteBookFile(filePath, filedata, event, (event, filedata) => {
        if (filedata.toString('utf-8')) {
            filedata = JSON.parse(filedata.toString('utf-8'))
        }
        event.reply('loadfile-reply', filedata)
    })
})
/* HOOK FilView 组件发送 同步当前的文件路径 */
ipcMain.on('syncFilePath-send', (event, currentFilePath) => {
    lastViewedFilePath = '/noteBooks'+ currentFilePath
})