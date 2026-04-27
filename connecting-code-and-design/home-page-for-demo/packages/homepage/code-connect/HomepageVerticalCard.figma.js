// source=home-page-for-demo/packages/homepage/src/code-connect.tsx
// component=HomepageVerticalCard
const figma = require('figma')
const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', {
  Metamaterial: 'metamaterial',
  Atmospheric: 'atmospheric',
  'New Visions': 'new-visions',
})

export default {
  id: 'homepage-vertical-card',
  imports: ['import { HomepageVerticalCard } from "@connecting-code-and-design/homepage/code-connect"'],
  example: figma.tsx`<HomepageVerticalCard variant="${variant}" />`,
  metadata: {
    isParserless: true,
    props: { variant },
  },
}
