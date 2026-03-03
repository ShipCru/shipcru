import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'

const slugify = (val?: string) =>
  val
    ?.replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const pluginNestedDocs = nestedDocsPlugin({
  collections: ['pages'],
  generateURL: (docs, doc) => {
    const hasSlug = 'slug' in doc && typeof doc.slug === 'string'
    const hasTitle = 'title' in doc && typeof doc.title === 'string'

    if (!(hasSlug || hasTitle)) {
      return ''
    }

    return docs.reduce((url, doc) => `${url}/${doc.slug || slugify(String(doc.title))}`, '')
  },
})
