const fs = require('fs')
const path = require('path')
const componentName = process.argv[process.argv.length - 1]

fs.copyFileSync(path.join('generators', 'componentTemplate.vue'), path.join('components', `${componentName}.vue`), fs.constants.COPYFILE_EXCL)

console.log('')
console.log(`${componentName}.js has been created in components/`)
console.log('')
