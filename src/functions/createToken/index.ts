import { validateHeader } from "../../utils/headers";
import { validate } from "../../utils/validator";
export const handler = async (event) => {
	
	if (!validateHeader(event.headers, 'Authorization')) {
		return {
			statusCode: 400,
			body: JSON.stringify({ error: 'Bad Request.', message: 'Authorization header is missing.' })
		}
	}
	const contentType = validateHeader(event.headers, 'Content-Type')
	if (!contentType) {
		return {
			statusCode: 400,
			body: JSON.stringify({ error: 'Bad Request.', message: 'Content-Type header is missing.' })
		}
	}
	if (contentType !== 'application/json') {
		return {
			statusCode: 400,
			body: JSON.stringify({ error: 'Bad Request.', message: 'The Content-Type must be set to application/json.' })
		}
	}

	try {
		const data = JSON.parse(event.body)
		const rules = {
			card_number: 'required|numeric|min:13|max:16|luhnFormat',
			cvv: 'required|numeric|min:3|max:4',
			expiration_month: 'required|string|min:1|max:2',
			expiration_year: 'required|string|min:4|max:4',
			email: 'required|string|min:5|max:100',
		}
		const validation = validate(data, rules);
		if (validation === true) {
			return {
				statusCode: 200,
				body: JSON.stringify({
					message: "Token created.",
					input: {},
				}),
			}
		} else {
			throw new Error(validation);
		}
	} catch (e) {
		return {
			statusCode: 422,
			body: JSON.stringify({
				error: 'Unprocessable Content',
				message: e.message
			}),
		};
	}
};