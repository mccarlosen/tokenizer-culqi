export const handler = async (event) => {
	return {
	  statusCode: 200,
	  body: JSON.stringify({
		  message: "Token created.",
		  input: event,
		}),
	};
};