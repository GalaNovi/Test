export default (dirtyData) => {
	const ratesArray = dirtyData.ValCurs.Valute;
	const rates = ratesArray.map(({
		CharCode,
		Name,
		Nominal,
		Value,
	}) => ({
		// id: item.$.ID,
		charCode: [CharCode],
		name: [Name],
		// numCode: item.NumCode[0],
		nominal: [Nominal],
		value: [Value],
	}));
	return rates;
};
