/* eslint-disable complexity */
/* eslint-disable unicorn/import-style */
import {Command, Flags} from '@oclif/core'
import * as inquirer from 'inquirer'
import * as chalk from 'chalk'
import * as path from 'node:path'
import * as fs from 'node:fs'
import fetch from 'node-fetch'

import copy from '../lib/copy'
import prompts from '../lib/prompts'
import frameworks from '../lib/frameworks'
import clone from '../lib/clone'
import replace from '../lib/replace'
import regions, {Region} from '../lib/regions'
import {addCustomParentFramework} from '../lib/helper-replace'

export default class CreateStoryblokAppCommand extends Command {
  static description = 'The CLI tool for quickly starting a Storyblok project';

  static flags = {
    help: Flags.help({char: 'h'}),
    version: Flags.version({char: 'v'}),
    key: Flags.string({char: 'k', description: 'Storyblok Access Token'}),
    region: Flags.string({
      char: 'r',
      description: 'Space region (EU or US)',
    }),
    folder: Flags.string({
      char: 'd',
      description: 'Folder path for the demo (e.g. my-demo)',
    }),
    framework: Flags.string({
      char: 'f',
      description: 'Framework to use (vuejs, nuxtjs, nuxtjs-3, nextjs, reactjs, remix, astro, sveltekit, gatsbyjs)',
    }),
    packagemanager: Flags.string({
      char: 'p',
      description: 'Package manager to use (yarn or npm or bun)',
    }),
  };

  async run(): Promise<void|number> {
    const log = this.log.bind(this)
    const chalkSb = chalk.hex('#00b3b0').bold
    log('')
    log(chalkSb('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'))
    log(chalkSb('@@@@@......................................@@@@@'))
    log(chalkSb('@@@@........................................@@@@'))
    log(chalkSb('@@@@........@@@@@@@@@@@@@@@@@@&.............@@@@'))
    log(chalkSb('@@@@........@@@@@@@@@@@@@@@@@@@@@@@.........@@@@'))
    log(chalkSb('@@@@........@@@@@@@@@@@@@@@@@@@@@@@@........@@@@'))
    log(chalkSb('@@@@........@@@@@@...........@@@@@@@........@@@@'))
    log(chalkSb('@@@@........@@@@@@..........@@@@@@@.........@@@@'))
    log(chalkSb('@@@@........@@@@@@@@@@@@@@@@@@@@@...........@@@@'))
    log(chalkSb('@@@@........@@@@@@...........@@@@@@@........@@@@'))
    log(chalkSb('@@@@........@@@@@@............@@@@@@@.......@@@@'))
    log(chalkSb('@@@@........@@@@@@@@@@@@@@@@@@@@@@@@@.......@@@@'))
    log(chalkSb('@@@@........@@@@@@@@@@@@@@@@@@@@@@@@........@@@@'))
    log(chalkSb('@@@@........@@@@@@@@@@@@@@@@@@&.............@@@@'))
    log(chalkSb('@@@@........................................@@@@'))
    log(chalkSb('@@@@........................................@@@@'))
    log(chalkSb('@@@@@......................................@@@@@'))
    log(chalkSb('@@@@@@@@@@@.....@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'))
    log(chalkSb('@@@@@@@@@@@...@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'))
    log('')
    log(
      chalkSb(
        'Welcome 👋, please create a new space first: https://app.storyblok.com/#/me/spaces/new',
      ),
    )
    log('')

    let directoryTargetCreated = false
    let directoryTempCreated = false

    const {flags} = await this.parse(CreateStoryblokAppCommand)
    const answers = await inquirer.prompt(prompts, flags)
    const {framework, folder, packagemanager, key, region} =
      answers
    const frameworkDetails = frameworks.find(f => f.value === framework)
    try {
      if (!framework || !frameworkDetails) {
        const frameworkList = frameworks.map(item => item.value).join(', ')
        throw new Error('Please provide a framework to scaffold with via  `-f <value>`, or `--framework=<value>`.\n Available values: ' + frameworkList)
      }

      const token = flags.key || key || frameworkDetails.token

      // region
      const spaceRegion: string = flags?.region || region // EU , US or CN
      let selectedRegion: Region | undefined
      if (Object.keys(regions).includes(spaceRegion)) {
        selectedRegion = regions[spaceRegion]
      } else {
        throw new Error(`Please provide a valid region via '-r' parameter : ${Object.keys(regions).join(', ')}`)
        return 2
      }

      let regionParam = ''

      if (!token) {
        log(
          chalk.red(
            'Please provide your access key with the --key argument',
          ),
        )
      }

      if (spaceRegion && ['US'].includes(spaceRegion)) {
        regionParam = `?region=${selectedRegion.value}`
      }

      log('')
      log('')
      log(chalkSb('Creating your demo ...'))

      // app endpoint connection
      const story: any = await fetch(
        `${selectedRegion.apiEndpoint}stories/home?version=draft&token=${token}`,
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
            `ⅹ Or the space is located in a region outside the ${spaceRegion}. In that case please provide the '--region' parameter`,
          ),
        )
        return
      }

      // check if target directoy exists
      if (fs.existsSync(folder)) {
        log(
          chalk.red(
            `I can't create the demo because the directory '${folder}' already exists. Try to define another directory name with the option '-d'.`,
          ),
        )
        return
      }

      // framework exmaple cloning
      let repositoryUrl = 'https://github.com/storyblok/getting-started.git'
      let submodules = frameworkDetails.submodules ?? false
      let targetPath = 'temp-started'
      if (frameworkDetails.repositoryUrl) {
        repositoryUrl = frameworkDetails.repositoryUrl
        submodules = false
        targetPath = `temp-started/${framework}`
      }

      await clone(repositoryUrl, targetPath, {
        shallow: true,
        checkout: frameworkDetails.branch ?? 'master',
        submodules: submodules,
      })
      directoryTempCreated = true

      copy(`./temp-started/${framework}`, folder)
      directoryTargetCreated = true
      fs.rmSync('./temp-started', {recursive: true})
      directoryTempCreated = false
      const replacements = {
        [frameworkDetails.token]: token,
      }
      if (['US', 'CN'].includes(spaceRegion)) {
        const regiontoreplace = "region: ''"
        replacements[regiontoreplace] =
          "region: '" + spaceRegion.toLowerCase() + "'"
      }

      if (spaceRegion === 'CN') {
        addCustomParentFramework({
          folder,
          framework,
          frameworkDetails,
          localhostPath: 'https://app.storyblokchina.cn',
        })
      }

      replace(path.join(folder, frameworkDetails.config), replacements)

      const pathEditing = `${selectedRegion.urlUi}/#/edit/${storyId}${regionParam}`
      const protocol = frameworkDetails.https ? 'https' : 'http'
      const localhostPath = `${protocol}://localhost:${frameworkDetails.port}/`

      log('')
      log(chalkSb('💪 Project created! Now just follow these steps 👇'))
      log('')

      // package manager
      let mangerInstall = 'npm install'
      let mangerRun = 'npm run'
      switch (packagemanager) {
      case 'yarn':
        mangerInstall = 'yarn'
        mangerRun = 'yarn run'
        break
      case 'bun':
        mangerInstall = 'bun install'
        mangerRun = 'bun run'
        break
      }

      const executeMkcert = frameworkDetails.usingMkcert ? ' && mkcert localhost ' : ''
      log(
        chalkSb('1. Start the server: '),
        chalk.yellow(
          `cd ./${folder} ${executeMkcert} && ${mangerInstall} && ${mangerRun} ${frameworkDetails.start}`,
        ),
      )
      log(chalkSb('2. Start editing:'), chalk.yellow(pathEditing))
      log('')
      log(
        chalkSb(
          'You need to setup mkcert to use the visual editor in the app: ',
        ),
      )
      log('')
      log(
        chalkSb('2.a MacOS: '),
        chalk.yellow(
          'https://www.storyblok.com/faq/setup-dev-server-https-proxy',
        ),
      )
      log(
        chalkSb('2.b Windows: '),
        chalk.yellow(
          'https://www.storyblok.com/faq/setup-dev-server-https-windows',
        ),
      )
      log(
        chalkSb('3. Setup your preview url: : '),
        chalk.yellow(
          'https://www.storyblok.com/docs/guide/getting-started#setup-of-the-visual-editor-preview',
        ),
        chalkSb(`to your localhost: ${localhostPath}`),
      )

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
      if (error instanceof Error) {
        log(
          chalk.red(
            error.message,
          ),
        )
      } else {
        log(
          chalk.red(
            'Generic Error',
          ),
        )
      }

      if (directoryTempCreated && fs.existsSync('./temp-started')) {
        fs.rmSync('./temp-started', {recursive: true})
        directoryTempCreated = false
      }

      if (directoryTargetCreated && fs.existsSync(`./${folder}`)) {
        fs.rmSync(`./${folder}`, {recursive: true})
        directoryTargetCreated = false
      }
    }
  }
}
