const frameworks = require('./frameworks')

module.exports = [
  {
    type: 'input',
    name: 'key',
    message: 'Space Access token',
    validate(value) {
      if (value.length > 0) {
        return true
      }

      return 'Please enter the access token for your Storyblok space:'
    },
  },
  {
    type: 'input',
    name: 'region',
    message: 'Space Region',
  },
  {
    type: 'input',
    name: 'folder',
    message: 'Choose a folder name:',
    validate(value) {
      if (value.length > 0) {
        return true
      }

      return 'Please enter a valid name for your folder:'
    },
  },
  {
    type: 'list',
    name: 'framework',
    message: 'Select framework:',
    choices: frameworks,
  },
  {
    type: 'list',
    name: 'packageManager',
    message: 'Select package manager:',
    choices: [
      {name: 'yarn', value: 'yarn'},
      {name: 'npm', value: 'npm'},
    ],
  },
]
