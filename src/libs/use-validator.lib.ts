import { emailDomainSupport } from './email-domain-support.lib'
import { emailFormat } from './email-format.lib'
import { luhnVerify } from './luhn-verify.lib'
import { validityYear } from './validity-year.lib'

const validateRule = (value: any, rule: string, params: string[]): boolean => {
  switch (rule) {
    case 'required':
      return value !== undefined && value !== null && value !== ''
    case 'numeric':
      return typeof value === 'number' && !isNaN(value)
    case 'string':
      return typeof value === 'string'
    case 'min':
      return String(value).length >= parseInt(params[0], 10)
    case 'max':
      return String(value).length <= parseInt(params[0], 10)
    case 'luhnFormat':
      return luhnVerify(value)
    case 'validityYear':
      return validityYear(value, parseInt(params[0], 10))
    case 'emailFormat':
      return emailFormat(value)
    case 'emailDomainSupport':
      return emailDomainSupport(value, ...params)
    default:
      return true
  }
}

export const useValidate = (data: any[], rules: object): boolean | string => {
  for (const field in rules) {
    if (Object.prototype.hasOwnProperty.call(rules, field) === true) {
      const fieldRules: string[] = rules[field].split('|')
      for (const rule of fieldRules) {
        const [ruleName, ...params] = rule.split(':')
        const isValid = validateRule(data[field], ruleName, params)
        if (!isValid) {
          throw new Error(`${field} does not meet the rule: ${rule}`)
        }
      }
    }
  }
  return true
}
