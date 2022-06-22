const {Command, flags} = require('@oclif/command')
const inquirer = require('inquirer')
const clone = require('git-clone/promise')
const fetch = require('node-fetch')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const copy = require('./copy')
const prompts = require('./prompts')
const frameworks = require('./frameworks')
const {createPublicFolder, addCustomParentFramework} = require('./helper-replace')
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

      const localhostPath = `http://localhost:${frameworkDetails.port}`
      const publicPath = `./${folder}/${frameworkDetails.public}`
      createPublicFolder({
        framework,
        localhostPath,
        publicPath,
        generator,
      })

      addCustomParentFramework({
        folder,
        framework,
        frameworkDetails,
        localhostPath,
      })

      const story = await fetch(`https://api.storyblok.com/v2/cdn/stories/home?version=draft&token=${token}`).then(res => res.json())
      const storyId = story.story.id

      log('')
      log('')
      log(chalk.green('✓ Project created! Now just execute following commands:'))

      const mangerInstall = answers.packageManager === 'yarn' ? 'yarn' : 'npm install'
      const mangerRun = answers.packageManager === 'yarn' ? 'yarn' : 'npm run'
      log('1. Start server: ', chalk.yellow(`cd ./${answers.folder} && ${mangerInstall} && ${mangerRun} ${frameworkDetails.start}`))
      log('2. Start editing:', chalk.yellow(`${localhostPath}/editor.html/#/edit/${storyId}`))
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
