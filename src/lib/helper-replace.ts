import * as fs from 'node:fs'
import copy from './copy'
import replace from './replace'

interface CreatePublicFolderOptions {
  framework: string
  publicPath: string
  generator: string
  localhostPath: string
}

export function createPublicFolder({
  framework,
  publicPath,
  generator,
  localhostPath,
}: CreatePublicFolderOptions): void {
  if (fs.existsSync(publicPath)) {
    fs.copyFileSync(
      `${generator}/editor.html`,
      publicPath + '/editor.html',
    )
  } else {
    copy(`${generator}/editor.html`, publicPath)
  }

  replace(`./${publicPath}/editor.html`, {
    gatsby: framework,
    'http://localhost:3000/': localhostPath + '/',
  })
}

interface AddCustomParentFrameworkOptions {
  folder: string
  framework: string
  frameworkDetails: any
  localhostPath: string
}

export function addCustomParentFramework({
  folder,
  framework,
  frameworkDetails,
  localhostPath,
}: AddCustomParentFrameworkOptions): void {
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
