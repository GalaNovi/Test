import { createStore } from 'vuex';
import { defaultStartAppDate } from '@/constants/defaultStartAppDate';
import { RussianRubleCurrency } from '@/constants/russianRubleCurrency';
import { adaptCurrencies } from '@/utils/adaptCurrencies';

export default createStore({
	state: {
		currencies: [],
	},
	mutations: {
		updateCurrencies(state, currencies) {
			state.currencies = currencies;
		},
	},
	actions: {
		async fetchCurrencies(ctx, requestedDate = defaultStartAppDate.toLocaleDateString('en-GB')) {
			const response = await fetch(`http://localhost:3000/getCurrencyRates?date=${requestedDate}`);
			const data = await response.json();
			if (data.ValCurs.Valute) {
				const currencies = adaptCurrencies(data);
				currencies.push(RussianRubleCurrency);
				ctx.commit('updateCurrencies', currencies);
				return currencies;
			}
			throw new Error('No data for the selected date');
		},
	},
	getters: {
		sortedCurrencies(state) {
			return state.currencies.sort((a, b) => {
				const nameA = a.name.toLowerCase();
				const nameB = b.name.toLowerCase();
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				return 0;
			});
		},
	},
});
