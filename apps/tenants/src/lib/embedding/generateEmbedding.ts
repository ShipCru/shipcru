import { embed } from 'ai'
import { openai } from '@ai-sdk/openai'

const EMBEDDING_MODEL = 'text-embedding-3-small'
const DIMENSIONS = 512

export async function generateEmbedding(text: string): Promise<number[]> {
  const truncated = text.slice(0, 8000)

  const { embedding } = await embed({
    model: openai.embedding(EMBEDDING_MODEL),
    value: truncated,
    providerOptions: { openai: { dimensions: DIMENSIONS } },
  })

  return embedding
}

export function vectorToString(vector: number[]): string {
  return `[${vector.join(',')}]`
}
