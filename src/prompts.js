const frameworks = require('./frameworks')
const regions = require('./regions')

module.exports = [
  {
    type: 'list',
    name: 'framework',
    message: 'Select framework:',
    prefix: '🔗',
    choices: frameworks,
  },
  {
    type: 'list',
    name: 'packagemanager',
    message: 'Select package manager:',
    prefix: '📦',
    choices: [
      {name: 'yarn', value: 'yarn'},
      {name: 'npm', value: 'npm'},
    ],
  },
  {
    type: 'input',
    name: 'key',
    message: 'Storyblok Access Token (recommended - if no token is provided, an example token will be used, that can be replaced later)',
    prefix: '🔑',
  },
  {
    type: 'list',
    name: 'region',
    message: 'Space Region (optional, EU is used by default):',
    default: 'eu-central-1',
    prefix: '🌍',
    choices: regions,
  },
  {
    type: 'input',
    name: 'folder',
    message: 'Local folder name for the project',
    default: 'my-storyblok-demo',
    prefix: '📁',
    validate(value) {
      if (value.length > 0) {
        return true
      }

      return 'Please enter a valid name for your folder:'
    },
  },
  {
    type: 'confirm',
    name: 'localmode',
    message: 'Storyblok will be served locally on your localhost instead of app.storyblok.com',
    prefix: '💻',
    default: true,
  },
]
