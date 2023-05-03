import { spawn } from 'node:child_process'

/**
 *
 * @param {string} repo repo's clone path
 * @param {string} targetPath save path
 * @param {Object} opts options
 * @return {promise}
 */

interface Options {
  git?: any;
  shallow?: boolean;
  submodules?: boolean;
  checkout?: string;
}

export default function (repo: string, targetPath: string, opts: Options) {
  opts = opts || {}

  const git = opts.git || 'git'
  const args = ['clone']

  if (opts.shallow) {
    args.push('--depth', '1')
  }

  if (opts.submodules) {
    args.push('--recurse-submodules')
  }

  if (opts.checkout) {
    args.push('--branch', opts.checkout)
  }

  args.push('--', repo, targetPath)

  const process = spawn(git, args)
  return new Promise((resolve, reject) => {
    process.on('close', function (status: number) {
      if (status === 0) {
        if (opts.checkout) {
          const process = spawn(git, ['checkout', opts.checkout], {cwd: targetPath})
          process.on('close', function (status: number) {
            if (status === 0) {
              resolve(true)
            } else {
              reject(new Error("'git checkout' failed with status " + status))
            }
          })
        } else {
          resolve(true)
        }
      } else {
        reject(new Error("'git clone' failed with status " + status))
      }
    })
  })
}
