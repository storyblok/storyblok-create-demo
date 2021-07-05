import React from 'react'
import { sbEditable } from '../lib/storyblok'

const Feature = ({ blok }) => (
    <div {...Editable(blok)} className="column feature">
      {blok.name}
    </div>
)

export default Feature
