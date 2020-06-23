// Modules to control application life and create native browser window
const {
    app,
    BrowserWindow,
    ipcMain,
    dialog,
    Menu,
    globalShortcut
} = require("electron");

const path = require("path");
const fs = require("fs");
const url = require('url')
const applicationTmp = require('./assets/template/index')
//consts
const editCachePath = path.join(__dirname, "/noteBooks/editBlockCache.json")
const pdfTmpPath = path.join(__dirname, './assets/template/previewPDF.html')
let main_process_utils = null;
let currentViewedFilePath = ''
let noteData = ''

//http URL definition
const httpURlCollins = "https://www.collinsdictionary.com/zh/dictionary/english/";
const httpQue = [httpURlCollins];


let mainWindow = null
let printWindow = null
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 740,
        minWidth: 370,
        //alwaysOnTop: true,
        //icon: path.join(__dirname, 'assets/images/sakurajima.jpg'),
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
            webSecurity: false 
        }
    })
    if (process.platform === 'darwin') {
        app.dock.setIcon(path.join(__dirname, 'assets/images/sakurajima.jpg'));
    }

    mainWindow.loadURL('http://localhost:3000/');
    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    //NOTE 考虑封装注册全局快捷键
    mainWindow.on('focus', () => {
        // mac下快捷键失效的问题
        if (process.platform === 'darwin') {
            let contents = mainWindow.webContents
            globalShortcut.register('CommandOrControl+C', () => {
                contents.copy()
            })
            globalShortcut.register('CommandOrControl+V', () => {
                contents.paste()
            })
            globalShortcut.register('CommandOrControl+X', () => {
                contents.cut()
            })
            globalShortcut.register('CommandOrControl+A', () => {
                contents.selectAll()
            })
        }
    })
    mainWindow.on('blur', () => {
        globalShortcut.unregisterAll() // 注销键盘事件
    })

    printWindow = new BrowserWindow({
        width: 1200,
        height: 740,
        minWidth: 370,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    })
    console.log('pdftemp is ', pdfTmpPath)
    printWindow.loadFile(pdfTmpPath)
        .then(result => {
            console.log('pdf window load result', result)
        })
    printWindow.webContents.openDevTools()

    mainWindow.on("close", () => {
        printWindow.close()
    })
    exports.mainWindow = mainWindow
    exports.printWindow = printWindow
}

app.whenReady().then(() => {
    //导入所有所需的模块
    loadUtils()
    main_process_utils.initFileViewInfo()
    createWindow()
})

app.on('ready', () => {
    //实例化全局菜单
    const appMenu = Menu.buildFromTemplate(applicationTmp.appMenuTmp)
    Menu.setApplicationMenu(appMenu)
    exports.appMenu = appMenu
})

app.on('browser-window-created', (event, win) => {

})

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


/* HOOK handler saveEditBlocks：将edit 区域的数据存入 notebooks/CeditBlockache.json */
ipcMain.on('saveEditBlocks-send', (event, arg) => {
    console.log('saveEditBlocks is called')
    let blocksDataJson = {}
    for (let i = 0; i < arg.length; i++) {
        let serial = 'block#' + i;
        blocksDataJson[serial] = arg[i]
    }
    blocksDataJson = JSON.stringify(blocksDataJson)
    noteData = blocksDataJson
    exports.noteData = noteData
    let writeLength = blocksDataJson.length
    main_process_utils.saveEditBlocks(blocksDataJson, currentViewedFilePath, (filePath) => {
        filePath = path.join(__dirname, currentViewedFilePath)
        //NOTE 可以通过是否同步来检查文件是否保存

        main_process_utils.syncCacheToFile(editCachePath, filePath)
    })
    //NOTE 用于实现进度条
    event.reply('saveEditBlocks-reply', writeLength)
})


/* HOOK handler loadFileViewInfo 加载 fileView 数据 */
ipcMain.on('loadFileViewInfo-send', (event, arg) => {
    console.log('load file vie info is called')
    let fileViewInfo = main_process_utils.fileViewInfo
    if (currentViewedFilePath) {
        let splitFilePath = currentViewedFilePath.split('/')
        let lastViewedFile = splitFilePath.pop()
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
    if (currentViewedFilePath) {
        let rollbackFilePath = path.join(__dirname, currentViewedFilePath)
        main_process_utils.readNoteBookFile(rollbackFilePath, filedata, event, (event, filedata) => {
            if (filedata.toString('utf-8')) {
                filedata = JSON.parse(filedata.toString('utf-8'))
                noteData = filedata
                exports.noteData = noteData
                event.reply('loadEditCache-reply', filedata)
            }
        })
    } else {
        let initPath = path.join(__dirname, main_process_utils.getDefaultFilePath())
        main_process_utils.readNoteBookFile(initPath, filedata, event, (event, filedata) => {
            if (filedata.toString('utf-8')) {
                filedata = JSON.parse(filedata.toString('utf-8'))
                noteData = filedata
                exports.noteData = noteData
                event.reply('loadEditCache-reply', filedata)
            }
        })
    }
})

/* HOOK 加载 noteBook file */
ipcMain.on('loadfile-send', (event, filePath) => {
    let loadfilePath = path.join(__dirname, filePath)
    let filedata
    main_process_utils.readNoteBookFile(loadfilePath, filedata, event, (event, filedata) => {
        if (filedata.toString('utf-8')) {
            filedata = JSON.parse(filedata.toString('utf-8'))
            currentViewedFilePath = filePath
            console.log('load file called, current path is ', currentViewedFilePath)
            event.reply('loadfile-reply', filedata)
        }
    })
})
/* HOOK FilView 组件发送 同步当前的文件路径 */
ipcMain.on('syncFilePath-send', (event, currentFilePath) => {
    currentViewedFilePath = '/noteBooks' + currentFilePath
    console.log('syncFilePath called ', currentViewedFilePath)
})

/* HOOK handler handleNewFold: file view 新建fold */
ipcMain.on("newFold-send", (event, foldInfo)=>{
    let newFoldPath = path.join(__dirname,'/noteBooks' + foldInfo.path)
    main_process_utils.newFold(newFoldPath,foldInfo)
    event.reply('newFold-reply', 'suc')
})

/* HOOK handler handleNewFile： file view 新建notebook 下文件 */
ipcMain.on('newFile-send', (event, arg) => {
    let ifNewFileSuc = main_process_utils.newFile(arg)
    event.reply('newFile-reply', ifNewFileSuc)
})

/* HOOK FoldBlock 组件发送, 重命名文件 */
ipcMain.on('rename-send', (event, arg) => {
    console.log('rename is called')
    let oldPath = path.join(__dirname, '/noteBooks' + arg.oldPath)
    let newPath = path.join(__dirname, '/noteBooks' + arg.newPath)
    //console.log('old path is ', oldPath, ' new path is ', newPath)
    let result = false
    //更改lastViewFile
    currentViewedFilePath = ''
    main_process_utils.rename(oldPath, newPath, () => {
        result = true
        console.log('rename file success')
        event.reply('rename-reply', result)
    })
})

/* HOOK FoldBlock 组件发送, 删除文件 */
ipcMain.on('deletefile-send', (event, filePath) => {
    console.log('delete file is called')
    let result = false
    //console.log('delete file path is ', filePath)
    //更改lastViewFile
    currentViewedFilePath = ''
    main_process_utils.deletefile(filePath, () => {
        result = true
        console.log('delete file success')
        event.reply('deletefile-reply', result)
    })
})

//打印 pdf 的预处理, 主要为 获取操作系统的类型和pdf文件保存路径
//考虑由应用程序菜单、 或是上下文菜单发送消息
/* HOOK 由 preview context menu发送 */
/* PARAMS data = {previewData: [], realHeight: number, realWidth: number} */
ipcMain.on("printPdf-send", async (event, data) => {
    //调用 print pdf handler
    console.log('print pdf is called', data)
    printWindow.webContents.send('print-edit', data);
    main_process_utils.printPdfHandler(printWindow);
    event.reply('printPdf-reply', data)
})
