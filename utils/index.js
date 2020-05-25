const searchHandler = require('./main_searchHandler')
const saveFileHandler = require('./main_saveEditBlocks')
const fileViewHandler = require('./main_fileViewHandler')
const exportFileHandler = require('./main_exportFile')
//consts
exports.fileViewInfo = fileViewHandler.fileViewInfo
//functions
exports.searchWord = searchHandler.searchWord

exports.saveEditBlocks = saveFileHandler.saveEditBlocks
exports.syncCacheToFile = saveFileHandler.syncCacheToFile

exports.newFile = fileViewHandler.newFile
exports.initFileViewInfo = fileViewHandler.initFileViewInfo
exports.getDefaultFilePath = fileViewHandler.getDefaultFilePath
exports.readNoteBookFile = fileViewHandler.readNoteBookFile
exports.rename = fileViewHandler.rename
exports.deletefile = fileViewHandler.deletefile

exports.printPdfHandler = exportFileHandler.printPdfHandler
exports.exportMarkDown = exportFileHandler.exportMarkDown

