import { validateHeader } from "../../libs/headers.lib";
import { validate } from "../../libs/validator.lib";
import { useResponseJson } from "../../libs/use-response-json.lib";
export const tokenizerCreateTokenHandler = async (event) => {
	
	if (!validateHeader(event.headers, 'Authorization')) {
		return useResponseJson({ error: 'Bad Request.', message: 'Authorization header is missing.' }, 400)
	}
	const contentType = validateHeader(event.headers, 'Content-Type')
	if (!contentType) {
		return useResponseJson({ error: 'Bad Request.', message: 'Content-Type header is missing.' }, 400)
	}
	if (contentType !== 'application/json') {
		return useResponseJson({ error: 'Bad Request.', message: 'The Content-Type must be set to application/json.' }, 400)
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

export const tokenizerGetCardDataHandler = async (event) => {
	return {
	  statusCode: 200,
	  body: JSON.stringify(
		{
		  message: "Card information.",
		  input: event,
		},
		null,
		2
	  ),
	};
};