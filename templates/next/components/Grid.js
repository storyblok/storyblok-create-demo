import React from 'react'
import DynamicComponent from '../components/DynamicComponent'
import { sbEditable } from '../lib/storyblok'

const Grid = ({ blok }) => {
  return (
    <div {...Editable(blok)} className="grid">
      {blok.columns.map((blok) =>
        (<DynamicComponent blok={blok} key={blok._uid}/>)
      )}
    </div>
  )
}
 
export default Grid
