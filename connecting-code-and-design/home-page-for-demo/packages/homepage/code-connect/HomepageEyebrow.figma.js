// source=home-page-for-demo/packages/homepage/src/code-connect.tsx
// component=HomepageEyebrow
const figma = require('figma')
const instance = figma.selectedInstance

const textLayer = instance.findText("[WHAT'S ON]")
const resolvedLabel = textLayer?.textContent === 'TOURS'
  ? 'tours'
  : textLayer?.textContent === 'EVENTS'
    ? 'events'
    : textLayer?.textContent === 'UPCOMING'
      ? 'upcoming'
      : 'whatsOn'

export default {
  id: 'homepage-eyebrow',
  imports: ['import { HomepageEyebrow } from "@connecting-code-and-design/homepage/code-connect"'],
  example: figma.tsx`<HomepageEyebrow label="${resolvedLabel}" />`,
  metadata: {
    isParserless: true,
    props: { label: resolvedLabel },
  },
}
