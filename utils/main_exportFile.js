const fs = require('fs')
const os = require('os')
const path = require('path')
const url = require('url')
const { dialog, BrowserWindow } = require('electron')

const templatePath = path.join(__dirname, '../assets/template/previewPDF.html')
//NOTE 考虑将文件名变成默认参数
async function printPdfHandler(mainWindow) {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    })
        .then((value) => {
            const pdfRootPath = value.filePaths[0]
            console.log('pdf root path is ', pdfRootPath)
            const pdfPath = path.join(pdfRootPath, 'Note.pdf')
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

async function mutiPrintPdf(data) {
    console.log('print pdf is called', data)
}

function exportMarkDown(data) {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    })
        .then((value) => {
            const mdRootPath = value.filePaths[0]
            console.log('md root path is ', mdRootPath)
            const mdPath = path.join(mdRootPath, 'Note.md')
            console.log('mdPath is ', mdPath)
            let content = ''
            //解析data
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const element = data[key];
                    console.log(element)
                    content += convertEl2MD(element)
                }
            }
            
            //写入文件
            fs.writeFile(mdPath, content, (err)=>{
                if(err) {
                    throw err
                }
                console.log('export mark down file success')
            })
        })
}

function convertEl2MD(element) {
    const english = element.english
    const chinese = element.chinese
    let content = `\n#### ${english} : ${chinese}`
    element.meanings.forEach((item, index) => {
        content += '\n##### ' + item.meaning
        item.collections.forEach(collection => {
            content += '\n+ ' + collection
        })
    });
    content += '\n***'
    console.log('content is ', content)
    return content
}
exports.printPdfHandler = printPdfHandler
exports.exportMarkDown = exportMarkDown