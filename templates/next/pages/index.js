import Head from 'next/head'

// The Storyblok Client & hook
import Storyblok, {useStoryblok} from '../lib/storyblok'
import DynamicComponent from '../components/dynamic-component'
import Logo from '../components/logo'

// eslint-disable-next-line no-unused-vars
export default function Home({story, preview}) {
  const enableBridge = true // load the storyblok bridge everywhere
  // const enableBridge = preview; // enable bridge only in preview mode
  story = useStoryblok(story, enableBridge)
  const isInEditor = typeof window !== 'undefined' && window.location !== window.parent.location

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div className="m-4 flex">
          <Logo />
          {!isInEditor && (<a href={`/editor.html#/edit/${story.id}`} className="edit-button shadow-lg text-xl text-white p-2.5 px-5 bg-pink-600 rounded-lg">
            Edit this page
          </a>)}
        </div>
      </header>

      <DynamicComponent blok={story.content} />
    </div>
  )
}

export async function getStaticProps({preview = false}) {
  // home is the default slug for the homepage in Storyblok
  let slug = 'home'
  // load the published content outside of the preview mode
  let sbParams = {
    version: 'draft', // or 'published'
  }

  if (preview) {
    // load the draft version inside of the preview mode
    sbParams.version = 'draft'
    sbParams.cv = Date.now()
  }

  let {data} = await Storyblok.get(`cdn/stories/${slug}`, sbParams)

  return {
    props: {
      story: data ? data.story : null,
      preview,
    },
    revalidate: 3600, // revalidate every hour
  }
}
