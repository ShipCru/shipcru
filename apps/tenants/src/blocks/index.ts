import type { Block } from 'payload'

import { Blog } from './Blog/config'
import { CTA } from './CTA/config'
import { HeroSplitImage } from './HeroSplitImage/config'
import { Metrics } from './Metrics/config'
import { Testimonials } from './Testimonials/config'

export const HERO_BLOCKS: Block[] = [HeroSplitImage]

export const LAYOUT_BLOCKS: Block[] = [Blog, Testimonials, Metrics, CTA]
