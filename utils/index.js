const searchHandler = require('./main_searchHandler')
const saveFileHandler = require('./main_saveEditBlocks')
const fileViewHandler = require('./main_fileViewHandler')
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
