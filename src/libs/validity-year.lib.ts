export const validityYear = (year: string, limit: number): boolean => {
  const yearParam = Number(year)
  const currentYear = new Date().getFullYear()
  const limitYear = currentYear + (limit - 1)
  if (yearParam < currentYear || yearParam > limitYear) {
    return false
  }
  return true
}
