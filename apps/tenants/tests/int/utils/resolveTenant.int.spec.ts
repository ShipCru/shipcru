import { describe, expect, it } from 'vitest'

import { resolveTenantByDomain, resolveTenantBySlug } from '@/utils/resolveTenant'

const mockTenant = { id: 1, name: 'Test Tenant', slug: 'test-tenant', domain: 'test.example.com' }

describe('resolveTenantByDomain', () => {
  it('returns null when no host matches any tenant domain', async () => {
    const mockPayload = {
      find: async () => ({ docs: [] as never[], totalDocs: 0 }),
    } as any

    const result = await resolveTenantByDomain(mockPayload, 'unknown.example.com')
    expect(result).toBeNull()
  })

  it('returns tenant when domain matches', async () => {
    const mockPayload = {
      find: async () => ({ docs: [mockTenant], totalDocs: 1 }),
    } as any

    const result = await resolveTenantByDomain(mockPayload, 'test.example.com')
    expect(result).toEqual(mockTenant)
  })

  it('strips port from hostname before lookup', async () => {
    let queriedDomain: string | undefined
    const mockPayload = {
      find: async ({ where }: any) => {
        queriedDomain = where.domain.equals
        return { docs: [mockTenant], totalDocs: 1 }
      },
    } as any

    await resolveTenantByDomain(mockPayload, 'test.example.com:3000')
    expect(queriedDomain).toBe('test.example.com')
  })
})

describe('resolveTenantBySlug', () => {
  it('returns null when slug does not match', async () => {
    const mockPayload = {
      find: async () => ({ docs: [] as never[] }),
    } as any

    const result = await resolveTenantBySlug(mockPayload, 'nonexistent')
    expect(result).toBeNull()
  })

  it('returns tenant when slug matches', async () => {
    const mockPayload = {
      find: async () => ({ docs: [mockTenant] }),
    } as any

    const result = await resolveTenantBySlug(mockPayload, 'test-tenant')
    expect(result).toEqual(mockTenant)
  })
})
