import type { SemanticSearchPluginConfig } from './types'
import type { Config, Plugin } from 'payload'

import { searchPlugin } from '@payloadcms/plugin-search'

import { getSemanticSearchFields } from './fields'
import { createBeforeSync } from './hooks/beforeSync'
import { queueSearchEmbeddingGeneration } from './hooks/queueEmbeddingGeneration'

export function createSemanticSearchPlugin(pluginConfig: SemanticSearchPluginConfig): Plugin {
  const collectionSlugs = pluginConfig.collections.map((c) => c.slug)

  const fullTextExtractors = Object.fromEntries(
    pluginConfig.collections.map((c) => [c.slug, c.generateFullText]),
  )

  return (config: Config): Config => {
    const withSearch = searchPlugin({
      collections: collectionSlugs,
      defaultPriorities: Object.fromEntries(
        pluginConfig.collections.map((c) => [c.slug, c.priority]),
      ),
      beforeSync: createBeforeSync(fullTextExtractors),
      searchOverrides: {
        fields: ({ defaultFields }) => [...defaultFields, ...getSemanticSearchFields()],
      },
    })(config)

    const updatedCollections = (withSearch.collections ?? []).map((collection) => {
      if (typeof collection === 'string') return collection
      if (!collectionSlugs.includes(collection.slug)) return collection

      const existingAfterChange = collection.hooks?.afterChange ?? []
      return {
        ...collection,
        hooks: {
          ...collection.hooks,
          afterChange: [...existingAfterChange, queueSearchEmbeddingGeneration],
        },
      }
    })

    return {
      ...withSearch,
      collections: updatedCollections,
    }
  }
}
