const fs = require('fs')
const path = require('path')
function newFile(fileName) {
    console.log(fileName)
    return true
}
exports.newFile = newFile