import type { Block } from 'payload'

import { HeroSplitImage } from './HeroSplitImage/config'
import { Blog } from './Blog/config'
import { Testimonials } from './Testimonials/config'
import { Metrics } from './Metrics/config'

export const HERO_BLOCKS: Block[] = [HeroSplitImage]

export const LAYOUT_BLOCKS: Block[] = [Blog, Testimonials, Metrics]
