export const handler = async (event) => {
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