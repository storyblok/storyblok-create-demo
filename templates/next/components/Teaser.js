import React from 'react'
import { sbEditable } from '../lib/storyblok'
 
const Teaser = ({blok}) => {
  return (
    <h2 {...Editable(blok)}>{blok.headline}</h2>
  )
}
 
export default Teaser
