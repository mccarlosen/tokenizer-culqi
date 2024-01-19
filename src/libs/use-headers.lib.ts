export const useHeaderValidate = (headers: object, matchHeader: string) => {
	return headers && headers[matchHeader.toLowerCase()]
}