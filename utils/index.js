const searchHandler = require('./main_searchHandler')
const saveFileHandler = require('./main_saveEditBlocks')
const fileViewHandler = require('./main_fileViewHandler')
exports.searchWord = searchHandler.searchWord
exports.saveEditBlocks = saveFileHandler.saveEditBlocks
exports.newFile = fileViewHandler.newFile