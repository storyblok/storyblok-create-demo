const fs = require('fs')
const path = require('path')

const copyFolderSync = function (from, to) {
  fs.mkdirSync(to)
  for (const element of fs.readdirSync(from)) {
    if (fs.lstatSync(path.join(from, element)).isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element))
    } else {
      copyFolderSync(path.join(from, element), path.join(to, element))
    }
  }
}

module.exports = copyFolderSync
