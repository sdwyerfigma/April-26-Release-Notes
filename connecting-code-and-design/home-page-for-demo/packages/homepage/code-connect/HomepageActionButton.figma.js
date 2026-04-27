// source=home-page-for-demo/packages/homepage/src/code-connect.tsx
// component=HomepageActionButton
const figma = require('figma')
const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', {
  Tickets: 'tickets',
  Explore: 'explore',
})

export default {
  id: 'homepage-action-button',
  imports: ['import { HomepageActionButton } from "@connecting-code-and-design/homepage/code-connect"'],
  example: figma.tsx`<HomepageActionButton variant="${variant}" />`,
  metadata: {
    isParserless: true,
    props: { variant },
  },
}
