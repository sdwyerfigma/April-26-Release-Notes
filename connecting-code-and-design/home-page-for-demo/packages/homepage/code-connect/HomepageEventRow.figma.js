// source=home-page-for-demo/packages/homepage/src/code-connect.tsx
// component=HomepageEventRow
const figma = require('figma')
const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', {
  Preview: 'preview',
  'Opening Weekend': 'opening-weekend',
  'Artist Talk': 'artist-talk',
})

export default {
  id: 'homepage-event-row',
  imports: ['import { HomepageEventRow } from "@connecting-code-and-design/homepage/code-connect"'],
  example: figma.tsx`<HomepageEventRow variant="${variant}" />`,
  metadata: {
    isParserless: true,
    props: { variant },
  },
}
