const {Command, flags} = require('@oclif/command')
const inquirer = require('inquirer')
const clone = require('./clone')
const fetch = require('node-fetch')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const copy = require('./copy')
const prompts = require('./prompts')
const frameworks = require('./frameworks')
const {
  createPublicFolder,
  addCustomParentFramework,
} = require('./helper-replace')
const replace = require('./replace')
const generator = path.resolve(__dirname, './')

class CreateStoryblokAppCommand extends Command {
  async run() {
    const {flags} = this.parse(CreateStoryblokAppCommand)
    const flagAnswers = flags
    const answers = await inquirer.prompt(prompts, flagAnswers)
    const {framework, folder, packageManager, key, region} = answers
    try {
      const log = this.log
      const token = flags.key || key

      // region
      const spaceRegion = flags?.region || region
      let apiEndpoint = 'https://api.storyblok.com/v2/cdn/'
      let regionParam = ''

      if (!token) {
        throw new Error(
          'Please provide your access key with the --key argument',
        )
      }

      if (spaceRegion && spaceRegion.startsWith('us-')) {
        apiEndpoint = 'https://api-us.storyblok.com/v2/cdn/'
        regionParam = `?region=${spaceRegion}`
      }

      log('')
      log('')
      log('Welcome to the Storyblok starter CLI!')

      // app endpoint connection
      const story = await fetch(
        `${apiEndpoint}stories/home?version=draft&token=${token}`,
      ).then(res => res.json())
      let storyId = 0
      if (story?.story) {
        storyId = story.story.id
      } else {
        log(
          chalk.red("ⅹ Could not find the default story with the slug 'home'"),
        )
        log(
          chalk.red(
            "ⅹ Or the space is located in a region outside the EU. In that case please provide the '--region' parameter",
          ),
        )
        return
      }

      // framework exmaple cloning
      const frameworkDetails = frameworks.find(f => f.value === framework)
      const gettingStartedRepo =
        'https://github.com/storyblok/getting-started.git'
      await clone(gettingStartedRepo, 'temp-started', {
        shallow: true,
        args: '',
        checkout: frameworkDetails.branch ?? 'master',
        submodules: frameworkDetails.submodules ?? false,
      })

      copy(`./temp-started/${framework}`, folder)
      fs.rmSync('./temp-started', {recursive: true})
      replace(path.join(folder, frameworkDetails.config), {
        [frameworkDetails.token]: token,
      })

      // https & public folder for editor
      const protocol = frameworkDetails.https ? 'https' : 'http'
      const localhostPath = `${protocol}://localhost:${frameworkDetails.port}`
      const publicPath = `./${folder}/${frameworkDetails.public}`
      createPublicFolder({
        framework,
        localhostPath,
        publicPath,
        generator,
      })

      // bridge connection overrider for custom parent
      addCustomParentFramework({
        folder,
        framework,
        frameworkDetails,
        localhostPath,
      })

      log('')
      log('')
      log(
        chalk.green('✓ Project created! Now just execute following commands:'),
      )

      // package manager
      const mangerInstall = packageManager === 'yarn' ? 'yarn' : 'npm install'
      const mangerRun = packageManager === 'yarn' ? 'yarn' : 'npm run'
      log(
        '1. Start the server: ',
        chalk.yellow(
          `cd ./${folder} && ${mangerInstall} && ${mangerRun} ${frameworkDetails.start}`,
        ),
      )
      log(
        '2. Start editing:',
        chalk.yellow(
          `${localhostPath}/editor.html#/edit/${storyId}${regionParam}`,
        ),
      )
      if (frameworkDetails.tutorialLink) {
        log(
          '3. Read the tutorial:',
          chalk.green(frameworkDetails.tutorialLink),
        )
        log('')
        log('')
      }
    } catch (error) {
      console.error(error)
      fs.rmSync('./temp-started', {recursive: true})
      fs.rmSync(`./${folder}`, {recursive: true})
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
  region: flags.string({char: 'r', description: 'Space region'}),
  directory: flags.string({
    char: 'd',
    description: 'Folder path for the demo',
  }),
  framework: flags.string({char: 'f', description: 'Framework to use'}),
  packagemanger: flags.string({
    char: 'p',
    description: 'Package manager to use',
  }),
}

module.exports = CreateStoryblokAppCommand
