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
    const log = this.log
    const chalkSb = chalk.hex('#00b3b0').bold

    log('')
    log(chalkSb('Welcome 👋, please create a new space first: https://app.storyblok.com/#/me/spaces/new'))
    log('')

    const {flags} = this.parse(CreateStoryblokAppCommand)
    const answers = await inquirer.prompt(prompts, flags)
    const {framework, folder, packagemanager, key, region, localmode} = answers
    const frameworkDetails = frameworks.find(f => f.value === framework)

    if (!framework) {
      throw new Error('Please provide a framework to scaffold with')
    }

    try {
      const token = flags.key || key || frameworkDetails.token

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
      log(chalkSb('Creating your demo ...'))

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

      let pathEditing = `https://app.storyblok.com/#/edit/${storyId}${regionParam}`
      const protocol = frameworkDetails.https ? 'https' : 'http'
      const localhostPath = `${protocol}://localhost:${frameworkDetails.port}/`

      // https & public folder for editor
      if (localmode) {
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
        pathEditing = `${localhostPath}/editor.html#/edit/${storyId}${regionParam}`
      }

      log('')
      log(
        chalkSb('💪 Project created! Now just follow these steps 👇'),
      )
      log('')

      // package manager
      const mangerInstall = packagemanager === 'yarn' ? 'yarn' : 'npm install'
      const mangerRun = packagemanager === 'yarn' ? 'yarn' : 'npm run'
      log(
        chalkSb('1. Start the server: '),
        chalk.yellow(
          `cd ./${folder} && ${mangerInstall} && ${mangerRun} ${frameworkDetails.start}`,
        ),
      )
      log(
        chalkSb('2. Start editing:'),
        chalk.yellow(pathEditing),
      )
      if (!localmode) {
        log(chalkSb('If you\'re not using local mode, you need to setup mkcert to use the visual editor in the app: '))
        log('')
        log(chalkSb('2.a MacOS: '), chalk.yellow('https://www.storyblok.com/faq/setup-dev-server-https-proxy'))
        log(chalkSb('2.b Windows: '), chalk.yellow('https://www.storyblok.com/faq/setup-dev-server-https-windows'))
        log(chalkSb('3. Setup your preview url: : '), chalk.yellow('https://www.storyblok.com/docs/guide/getting-started#setup-of-the-visual-editor-preview'), chalkSb(`to your localhost: ${localhostPath}`))
      }

      if (frameworkDetails.tutorialLink) {
        log('')
        log(
          chalkSb('📕 Read the tutorial:'),
          chalk.yellow(frameworkDetails.tutorialLink),
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
  help: flags.help({char: 'h'}),
  version: flags.version({char: 'v'}),
  key: flags.string({char: 'k', description: 'Storyblok Access Token'}),
  region: flags.string({char: 'r', description: 'Space region (e.g. us-east-1)'}),
  folder: flags.string({
    char: 'd',
    description: 'Folder path for the demo (e.g. my-demo)',
  }),
  framework: flags.string({char: 'f', description: 'Framework to use (e.g. remix)'}),
  packagemanager: flags.string({
    char: 'p',
    description: 'Package manager to use (yarn or npm)',
  }),
  localmode: flags.boolean({
    char: 'l',
    description: 'using the local mode',
  }),
}

module.exports = CreateStoryblokAppCommand
