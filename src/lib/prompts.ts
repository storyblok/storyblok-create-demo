import frameworks from './frameworks'
import regions from './regions'

export default [
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
      {name: 'bun', value: 'bun'},
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
    default: 'EU',
    prefix: '🌍',
    choices: Object.keys(regions),
  },
  {
    type: 'input',
    name: 'folder',
    message: 'Local folder name for the project',
    default: 'my-storyblok-demo',
    prefix: '📁',
    validate(value: string): boolean|string {
      if (value.length > 0) {
        return true
      }

      return 'Please enter a valid name for your folder:'
    },
  },
]
