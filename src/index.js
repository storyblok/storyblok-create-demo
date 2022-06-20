const {Command, flags} = require('@oclif/command')
const inquirer = require('inquirer')
const clone = require('git-clone/promise')
const path = require('path')
const fs = require('fs')
const copy = require('./copy')
const prompts = require('./prompts')
const frameworks = require('./frameworks')
const replace = require('./replace')
const generator = path.resolve(__dirname, './')

class CreateStoryblokAppCommand extends Command {
  async run() {
    try {
      const log = this.log
      const {flags} = this.parse(CreateStoryblokAppCommand)
      const token = flags.key

      if (!token) {
        throw new Error('Please provide your access key with the --key argument')
      }

      log('Welcome to the Storyblok starter CLI!')
      log('')
      log('')

      const answers = await inquirer.prompt(prompts)
      const {framework, folder} = answers
      const frameworkDetails = frameworks.find(f => f.value === framework)
      const gettingStartedRepo = 'https://github.com/storyblok/getting-started.git'
      await clone(gettingStartedRepo, 'temp-started', {
        shallow: true,
        args: '',
        checkout: 'master',
      })

      copy(`./temp-started/${framework}`, folder)
      fs.rmSync('./temp-started', {recursive: true})
      replace(path.join(answers.folder, frameworkDetails.config), {
        [frameworkDetails.token]: token,
      })

      const publicPath = `./${folder}/${frameworkDetails.public}`
      const localhostPath = `http://localhost:${frameworkDetails.port}/`
      if (fs.existsSync(publicPath)) {
        fs.copyFileSync(`${generator}/../templates/static/editor.html`, publicPath + '/editor.html')
      } else {
        copy(`${generator}/../templates/static`, publicPath)
      }

      replace(`./${publicPath}/editor.html`, {
        gatsby: framework,
        'http://localhost:3000/': localhostPath,
      })

      log('')
      log('')
      log('✓ Project created! Now just execute following commands:')

      if (answers.packageManager === 'yarn') {
        log(`- Start server: cd ./${answers.folder} && yarn && yarn ${frameworkDetails.start}`)
      } else {
        log(`- Start server: cd ./${answers.folder} && npm install && npm run ${frameworkDetails.start}`)
      }
      log(`- Start editing: ${localhostPath}editor.html`)
      log('')
      log('')
    } catch (error) {
      console.error(error)
    }
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
