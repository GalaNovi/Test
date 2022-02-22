export default (dirtyData) => {
	const ratesArray = dirtyData.ValCurs.Valute;
	const rates = ratesArray.map(({
		CharCode,
		Name,
		Nominal,
		Value,
	}) => ({
		charCode: CharCode[0],
		name: Name[0],
		nominal: Number(Nominal[0]),
		value: Number(Value[0].replace(',', '.')),
	}));
	return rates;
};
