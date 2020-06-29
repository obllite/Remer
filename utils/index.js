const searchHandler = require('./main_searchHandler')
const saveFileHandler = require('./main_saveEditBlocks')
const fileViewHandler = require('./main_fileViewHandler')
const exportFileHandler = require('./main_exportFile')
const viewHandler = require('./main_viewHandler')
const remoteHandler = require('./main_remote')
const progressHandler = require('./main_progressBar')
const diffHandler = require('./main_diff')
//consts
exports.fileViewInfo = fileViewHandler.fileViewInfo
//functions
exports.searchWord = searchHandler.searchWord

exports.saveEditBlocks = saveFileHandler.saveEditBlocks
exports.syncCacheToFile = saveFileHandler.syncCacheToFile

exports.newFold = fileViewHandler.newFold
exports.newFile = fileViewHandler.newFile
exports.initFileViewInfo = fileViewHandler.initFileViewInfo
exports.getDefaultFilePath = fileViewHandler.getDefaultFilePath
exports.readNoteBookFile = fileViewHandler.readNoteBookFile
exports.rename = fileViewHandler.rename
exports.deletefile = fileViewHandler.deletefile

exports.printPdfHandler = exportFileHandler.printPdfHandler
exports.exportMarkDown = exportFileHandler.exportMarkDown

exports.setSuspended = viewHandler.setSuspended
exports.cancelSuspended = viewHandler.cancelSuspended

exports.uploadHandler = remoteHandler.uploadHandler
exports.downloadHandler = remoteHandler.downloadHandler
exports.syncFileHandler = remoteHandler.syncFileHandler

exports.createTask = progressHandler.createTask
exports.updateTask = progressHandler.updateTask

exports.diffFileInfo = diffHandler.diffFileInfo