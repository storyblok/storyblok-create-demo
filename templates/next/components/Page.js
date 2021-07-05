import DynamicComponent from './DynamicComponent'
import { sbEditable } from '../lib/storyblok'

const Page = ({ blok }) => (
  <main {...Editable(blok)}>
    {blok.body
      ? blok.body.map((blok) => (
          <DynamicComponent blok={blok} key={blok._uid} />
        ))
      : null}
  </main>
);

export default Page
