export const emailDomainSupport = (email: string, ...params: string[]): boolean => {
  const [, domain] = email.split('@')
  if (params.includes(domain)) {
    return true
  }
  return false
}
