const fs = require('fs')
const os = require('os')
const path = require('path')
const url = require('url')
const { dialog, BrowserWindow } = require('electron')

const templatePath = path.join(__dirname, '../assets/template/previewPDF.html')

function newPrintWin(){
    const previewPDFWin = new BrowserWindow({
        width: 400,
        height: 200,
        webPreferences: {
            webSecurity: false
        }
    })

    previewPDFWin.loadURL(url.format({
        pathname: templatePath,   //index位置
        protocol: 'file:',  //协议
        slashes: true    //是否有双斜线
    }))

}
async function printPdfHandler(mainWindow) {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    })
        .then((value) => {
            const pdfRootPath = value.filePaths[0]
            const pdfPath = path.join(pdfRootPath, 'print.pdf')
            console.log(mainWindow.webContents)
            mainWindow.webContents.printToPDF({
                pageSize: 'A3',
                marginType: 1,
                printBackground: true
            }).then(data => {
                console.log('path is ', pdfPath)
                fs.writeFile(pdfPath, data, (err) => {
                    if (err) {
                        throw err
                    }
                    console.log('print pdf success')
                })
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => console.log(err))
}
exports.printPdfHandler = printPdfHandler
exports.newPrintWin = newPrintWin