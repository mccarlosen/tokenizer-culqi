export const validateHeader = (headers: object, matchHeader: string) => {
	return headers && headers[matchHeader.toLowerCase()]
}