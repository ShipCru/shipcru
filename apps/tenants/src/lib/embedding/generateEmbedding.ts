import { embed } from 'ai'
import { openai } from '@ai-sdk/openai'

const DIMENSIONS = 512
const embeddingModel = openai.embedding('text-embedding-3-small')

export async function generateEmbedding(text: string): Promise<number[]> {
  const truncated = text.slice(0, 8000)

  const { embedding } = await embed({
    model: embeddingModel,
    value: truncated,
    providerOptions: { openai: { dimensions: DIMENSIONS } },
  })

  return embedding
}

export function vectorToString(vector: number[]): string {
  return `[${vector.join(',')}]`
}
