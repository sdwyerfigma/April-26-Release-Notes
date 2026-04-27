// source=home-page-for-demo/packages/homepage/src/code-connect.tsx
// component=HomepageMembershipCard
const figma = require('figma')
const instance = figma.selectedInstance

const button = instance.findText('Button')
const ctaLabel = button?.textContent || 'View memberships'

export default {
  id: 'homepage-membership-card',
  imports: ['import { HomepageMembershipCard } from "@connecting-code-and-design/homepage/code-connect"'],
  example: figma.tsx`<HomepageMembershipCard ctaLabel="${ctaLabel}" />`,
  metadata: {
    isParserless: true,
    props: { ctaLabel },
  },
}
