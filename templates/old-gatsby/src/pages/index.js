import * as React from 'react'
import {graphql} from 'gatsby'
import useStoryblok from '../lib/storyblok'
import DynamicComponent from '../components/dynamic-component'
import Logo from '../components/logo'

const IndexPage = ({data, location}) => {
  let story = data.storyblokEntry
  story = useStoryblok(story, location)
  let isInEditor = false

  if (typeof window !== 'undefined' && window.location !== window.parent.location) {
    isInEditor = true
  }

  return (
    <div className="container mx-auto px-4">
      <header>
        <div className="m-4 flex">
          <Logo />
          {!isInEditor && (<a href={`/editor.html#/edit/${story.internalId}`} className="edit-button shadow-lg text-xl text-white p-2.5 px-5 bg-pink-600 rounded-lg">
            Edit this page
          </a>)}
        </div>
      </header>

      <DynamicComponent blok={story.content} />
    </div>
  )
}

export default IndexPage

export const query = graphql`
  query IndexQuery {
    storyblokEntry(full_slug: {eq: "home"}) {
      content
      name
      internalId
    }
  }
`
