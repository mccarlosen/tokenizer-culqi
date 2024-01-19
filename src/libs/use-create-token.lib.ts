const crypto = require("crypto");
export const useCreateToken = (length: number): string => {
	const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	const charactersLength = characters.length;
  
	return Array.from(crypto.randomBytes(length))
	  .map((byte: any) => characters[byte % charactersLength])
	  .join('');
};