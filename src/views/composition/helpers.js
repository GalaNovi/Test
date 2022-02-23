import { polyCodes } from '@/constants/polyCodes';

export const useHelpers = () => {
	const equalCharCodes = (firstCharCode, secondCharCode) => {
		if (polyCodes.BYN.includes(firstCharCode) && polyCodes.BYN.includes(secondCharCode)) {
			return true;
		}

		return firstCharCode === secondCharCode;
	};

	return {
		equalCharCodes,
	};
};
