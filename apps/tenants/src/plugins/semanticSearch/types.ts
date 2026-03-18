export type GenerateFullText = (doc: Record<string, any>) => string

export type SearchCollectionConfig = {
  slug: string
  priority: number
  generateFullText: GenerateFullText
}

export type SemanticSearchPluginConfig = {
  collections: SearchCollectionConfig[]
}
