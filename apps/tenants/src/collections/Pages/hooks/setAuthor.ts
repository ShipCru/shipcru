import type { CollectionBeforeChangeHook } from 'payload'

export const setAuthor: CollectionBeforeChangeHook = ({ data, operation, req }) => {
  if (operation === 'create' && req.user) {
    return {
      ...data,
      author: req.user.id,
    }
  }

  return data
}
