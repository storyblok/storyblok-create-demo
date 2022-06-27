const spawn = require('child_process').spawn

/**
 *
 * @param {string} repo repo's clone path
 * @param {string} targetPath save path
 * @param {Object} opts options
 * @return {promise}
 */
module.exports = function (repo, targetPath, opts) {
  opts = opts || {}

  const git = opts.git || 'git'
  const args = ['clone']

  if (opts.shallow) {
    args.push('--depth', '1')
  }

  args.push('--', repo, targetPath)

  const process = spawn(git, args)
  return new Promise((resolve, reject) => {
    process.on('close', function (status) {
      if (status === 0) {
        if (opts.checkout) {
          _checkout()
        } else {
          resolve()
        }
      } else {
        reject(new Error("'git clone' failed with status " + status))
      }
    })
    function _checkout() {
      const args = ['checkout', opts.checkout]
      const process = spawn(git, args, {cwd: targetPath})
      process.on('close', function (status) {
        if (status === 0) {
          resolve()
        } else {
          reject(new Error("'git checkout' failed with status " + status))
        }
      })
    }
  })
}
