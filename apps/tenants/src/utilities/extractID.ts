export const extractID = (objectOrID: { id: number } | number): number => {
  if (typeof objectOrID === 'number') return objectOrID
  return objectOrID.id
}
