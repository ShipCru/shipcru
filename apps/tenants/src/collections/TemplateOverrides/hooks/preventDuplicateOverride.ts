import type { CollectionBeforeValidateHook } from 'payload'

export const preventDuplicateOverride: CollectionBeforeValidateHook = async ({
  data,
  req,
  operation,
  originalDoc,
}) => {
  if (!data || (operation !== 'create' && operation !== 'update')) return data

  const where: Record<string, unknown> = {}

  if (data.tenant) {
    where.tenant = { equals: data.tenant }
  } else {
    where.tenant = { exists: false }
  }

  where.targetType = { equals: data.targetType }

  if (data.targetType === 'keyword-landing') {
    where.targetPattern = { equals: data.targetPattern }
  } else if (data.targetEntity) {
    where.targetEntity = { equals: data.targetEntity }
  } else {
    return data
  }

  if (operation === 'update' && originalDoc?.id) {
    where.id = { not_equals: originalDoc.id }
  }

  const existing = await req.payload.find({
    collection: 'template-overrides',
    where,
    limit: 1,
    req,
  })

  if (existing.docs.length > 0) {
    const target =
      data.targetType === 'keyword-landing'
        ? `pattern "${data.targetPattern}"`
        : 'this entity'
    throw new Error(
      `An override already exists for ${target}. Each target can only have one override per tenant.`,
    )
  }

  return data
}
