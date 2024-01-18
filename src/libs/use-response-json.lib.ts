export const useResponseJson = (message: string | object, code: number) => {
	return {
		statusCode: code,
		body: JSON.stringify(message)
	}
}