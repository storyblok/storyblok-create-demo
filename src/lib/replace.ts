import * as fs from 'node:fs'

export default function (file: fs.PathOrFileDescriptor, replacements: { [x: string]: string }) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) {
        return reject(err)
      }

      for (const from in replacements) {
        if (from) {
          data = data.replace(from, replacements[from])
        }
      }

      fs.writeFile(file, data, 'utf8', function (err) {
        if (err) {
          return reject(err)
        }

        return resolve(true)
      })
    })
  })
}
