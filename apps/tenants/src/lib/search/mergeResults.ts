import type { SearchResult } from './trigramSearch'

const COLLECTION_PRIORITIES: Record<string, number> = {
  'job-titles': 20,
  'resume-content': 10,
}

const MAX_PRIORITY = 20

interface ScoredResult extends SearchResult {
  trigramScore: number
  vectorScore: number
  combinedScore: number
}

export function mergeResults(
  trigramResults: SearchResult[],
  vectorResults: SearchResult[],
  limit: number = 20,
): SearchResult[] {
  const resultMap = new Map<string, ScoredResult>()

  const key = (r: SearchResult) => `${r.collection}:${r.docId}`

  for (const r of trigramResults) {
    resultMap.set(key(r), {
      ...r,
      trigramScore: r.score,
      vectorScore: 0,
      combinedScore: 0,
    })
  }

  for (const r of vectorResults) {
    const k = key(r)
    const existing = resultMap.get(k)
    if (existing) {
      existing.vectorScore = r.score
    } else {
      resultMap.set(k, {
        ...r,
        trigramScore: 0,
        vectorScore: r.score,
        combinedScore: 0,
      })
    }
  }

  for (const result of resultMap.values()) {
    const priority = COLLECTION_PRIORITIES[result.collection] ?? 0
    const normalizedPriority = priority / MAX_PRIORITY

    result.combinedScore =
      result.trigramScore * 0.4 + result.vectorScore * 0.4 + normalizedPriority * 0.2
  }

  return Array.from(resultMap.values())
    .sort((a, b) => b.combinedScore - a.combinedScore)
    .slice(0, limit)
    .map(({ trigramScore, vectorScore, combinedScore, ...rest }) => ({
      ...rest,
      score: combinedScore,
    }))
}
