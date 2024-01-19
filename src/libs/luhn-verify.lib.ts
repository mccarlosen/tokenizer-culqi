export const luhnVerify = (cardNumber: number): boolean => {
  const digits: number[] = Array.from(String(cardNumber), Number)
  for (let i = digits.length - 2; i >= 0; i -= 2) {
    digits[i] *= 2
    if (digits[i] > 9) {
      digits[i] -= 9
    }
  }
  const summationTotal = digits.reduce((acc, digit) => acc + digit, 0)
  return summationTotal % 10 === 0
}
