export const adaptCurrencies = (dirtyData) => dirtyData.ValCurs.Valute.map(({
	CharCode, Name, Nominal, Value,
}) => ({
	charCode: CharCode[0],
	name: Name[0],
	nominal: Number(Nominal[0]),
	value: Number(Value[0].replace(',', '.')),
}));
