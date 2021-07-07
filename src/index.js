const {Command, flags} = require('@oclif/command')
const inquirer = require('inquirer')
const copy = require('./copy')
const replace = require('./replace')
const path = require('path')
const generator = path.resolve(__dirname, './')

class CreateStoryblokAppCommand extends Command {
  async run() {
    const {flags} = this.parse(CreateStoryblokAppCommand)
    const token = flags.key

    if (!token) {
      throw new Error('Please provide your access key with the --key argument')
    }

    this.log(`Welcome to the Storyblok starter CLI!`)
    this.log('')

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'folder',
          message: 'Choose a folder name:',
          validate(value) {
            if (value.length > 0) {
              return true
            }
            return 'Please enter a valid name for your folder:'
          }
        },
        {
          type: 'list',
          name: 'framework',
          message: 'Select framework:',
          choices: [
            {name: 'Nuxt.js (Vue.js)', value: 'nuxt'},
            {name: 'Next.js (React)', value:  'next'},
          ]
        },
        {
          type: 'list',
          name: 'packageManager',
          message: 'Select package manager:',
          choices: [
            {name: 'yarn', value: 'yarn'},
            {name: 'npm', value:  'npm'},
          ]
        },
      ])
      .then((answers) => {
        copy(`${generator}/../templates/${answers.framework}`, answers.folder)

        if (answers.framework === 'nuxt') {
          replace(path.join(answers.folder, 'nuxt.config.js'), {
            'SpsQWF7qrWUOkusdMzNZWAtt': token
          })
        } else {
          replace(path.join(answers.folder, 'lib', 'storyblok.js'), {
            'SpsQWF7qrWUOkusdMzNZWAtt': token
          })
        }
        console.log('')
        console.log('')
        console.log('✓ Project created! Now just execute following commands:')
        console.log('')
        console.log('')
        if (answers.packageManager === 'yarn') {
          console.log('  cd ./' + answers.folder + ' && yarn && yarn dev')
        } else {
          console.log('  cd ./' + answers.folder + ' && npm install && npm run dev')
        }
        console.log('')
        console.log('')
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

CreateStoryblokAppCommand.description = `CLI for quickly start a project with Storyblok
...
Currently Nuxt.js and Next.js are supported as boilerplates to quickly start with Storyblok.
`

CreateStoryblokAppCommand.flags = {
  version: flags.version({char: 'v'}),
  help: flags.help({char: 'h'}),
  key: flags.string({char: 'k', description: 'Storyblok access key'}),
}

module.exports = CreateStoryblokAppCommand
