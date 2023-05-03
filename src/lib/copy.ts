import * as fs from 'node:fs'
import * as path from 'node:path'

const copyFolderSync = function (from: string, to: string) {
  fs.mkdirSync(to)
  for (const element of fs.readdirSync(from)) {
    if (fs.lstatSync(path.join(from, element)).isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element))
    } else {
      copyFolderSync(path.join(from, element), path.join(to, element))
    }
  }
}

export default copyFolderSync
