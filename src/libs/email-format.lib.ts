export const emailFormat = (email: string): boolean => {
  const emailValidated = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
  return emailValidated
}
