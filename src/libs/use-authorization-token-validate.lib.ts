export const useAuthorizationTokenValidate = () => {
	const check = (token: string): boolean => {
		const regex = /^pk_test_[a-zA-Z0-9]{20}$/;
		return regex.test(token);
	}

	return {
		check
	}
}