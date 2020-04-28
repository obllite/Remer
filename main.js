//NOTE main.js 中导入需要用path.join 来导入

// Modules to control application life and create native browser window
const {
    app,
    BrowserWindow,
    ipcMain,
    dialog
} = require("electron");
const cheerio = require("cheerio");
const request = require("request");
const path = require("path");
const fs = require("fs");
let main_process_utils = null;

//http URL definition
const httpURlCollins = "https://www.collinsdictionary.com/zh/dictionary/english/";
const httpQue = [httpURlCollins];
function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 740,
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
app.whenReady().then(() => {
    //导入所有所需的模块
    loadUtils()
    createWindow()
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
    const file = path.join(__dirname, 'utils/scrapy.js')
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
    console.log('arg is ', arg)
    const content = await searchWord(arg, httpQue)
    event.reply('searchWord-reply', content)
})

//FUNCTION scrapy 部分
//PARAMS httpQue 为 http url 队列，考虑传入配置interface来进行http配置
//NOTE 无法将这部分代码放入 utils 中
//TODO 添加请求错误处理（特别是超时，因为多数国外网站需要梯子）
function searchWord(word, httpQue) {
    //console.log(innerContent)
    let httpURL = '';
    console.log('http is ', httpQue[0]);
    console.log('word is ', word);
    httpURL = httpQue[0].concat(word);
    console.log('httpURL is ', httpURL);
    main_process_utils.utilsTest()
    return new Promise((resolve, reject) => {
        request.get(httpURL, (err, res, data) => {
            resolve(getContent(data))
        })
    })
}
function getContent(data) {
    let $ = cheerio.load(data);
    let innerContent = $(".content.definitions.cobuild.br").html()
    console.log(innerContent)
    return innerContent
}

