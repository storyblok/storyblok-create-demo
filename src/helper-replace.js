const fs = require('fs')
const copy = require('./copy')
const replace = require('./replace')

function createPublicFolder({
  framework,
  publicPath,
  generator,
  localhostPath,
}) {
  if (fs.existsSync(publicPath)) {
    fs.copyFileSync(
      `${generator}/../templates/static/editor.html`,
      publicPath + '/editor.html',
    )
  } else {
    copy(`${generator}/../templates/static`, publicPath)
  }

  replace(`./${publicPath}/editor.html`, {
    gatsby: framework,
    'http://localhost:3000/': localhostPath + '/',
  })
}

function addCustomParentFramework({
  folder,
  framework,
  frameworkDetails,
  localhostPath,
}) {
  switch (framework) {
  case 'gatsbyjs':
  case 'nextjs':
  case 'remix':
    replace(`./${folder}/${frameworkDetails.bridge}`, {
      'useStoryblokState(story)': `useStoryblokState(story, { customParent: '${localhostPath}'})`,
    })
    return
  case 'nuxtjs':
  case 'vuejs':
    replace(`./${folder}/${frameworkDetails.bridge}`, {
      "useStoryblok('home', { version: 'draft' })": `useStoryblok('home', { version: 'draft' }, { customParent: '${localhostPath}'})`,
    })
    return
  case 'nuxtjs-3':
    replace(`./${folder}/${frameworkDetails.bridge}`, {
      "useAsyncStoryblok('home', { version: 'draft' })": `useAsyncStoryblok('home', { version: 'draft' }, { customParent: '${localhostPath}'})`,
    })
    return
  case 'reactjs':
    replace(`./${folder}/${frameworkDetails.bridge}`, {
      '{ version: "draft" }': `{ version: 'draft' }, { customParent: '${localhostPath}'}`,
    })
    return
  case 'sveltekit':
    replace(`./${folder}/${frameworkDetails.bridge}`, {
      'useStoryblokBridge(story.id, (newStory) => (story = newStory))': `useStoryblokBridge(story.id, (newStory) => (story = newStory), { customParent: '${localhostPath}'})`,
    })
  }
}

module.exports = {
  createPublicFolder,
  addCustomParentFramework,
}
