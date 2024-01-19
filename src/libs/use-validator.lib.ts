import { luhnVerify } from "./luhn-verify.lib";

const validateRule = (value: any, rule: string, params: Array<string>) => {
	switch (rule) {
		case 'required':
			return value !== undefined && value !== null && value !== '';
		case 'numeric':
			return typeof value === 'number' && !isNaN(value);
		case 'string':
			return typeof value === 'string';
		case 'min':
			return String(value).length >= parseInt(params[0], 10);
		case 'max':
			return String(value).length <= parseInt(params[0], 10);
		case 'luhnFormat':
			return luhnVerify(value);
		default:
			return true;
	}
}

export const validate = (data: Array<any>, rules: object) => {
	for (let field in rules) {
	  if (rules.hasOwnProperty(field)) {
		const fieldRules = rules[field].split('|');
		for (let rule of fieldRules) {
		  const [ruleName, ...params] = rule.split(':');
		  const isValid = validateRule(data[field], ruleName, params);
		  if (!isValid) {
			return `${field} does not meet the rule: ${rule}`;
		  }
		}
	  }
	}
	return true;
}
  