// source=home-page-for-demo/packages/homepage/src/code-connect.tsx
// component=HomepageHeroCard
const figma = require('figma')
const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', {
  'Spaceship Earth': 'spaceship-earth',
  'Re:Furnished': 're-furnished',
  'Quiet Spectrum': 'quiet-spectrum',
})

export default {
  id: 'homepage-hero-card',
  imports: ['import { HomepageHeroCard } from "@connecting-code-and-design/homepage/code-connect"'],
  example: figma.tsx`<HomepageHeroCard variant="${variant}" />`,
  metadata: {
    isParserless: true,
    props: { variant },
  },
}
