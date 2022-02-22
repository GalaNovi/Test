import { createStore } from 'vuex';
import adaptCurrencies from '@/utils/adaptCurrencyRates';
import { defaultStartAppDate } from '@/constants/defaultStartAppDate';
import { RussianRubleCurrency } from '@/constants/russianRubleCurrency';

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
			const currencies = await fetch(`http://localhost:3000/getCurrencyRates?date=${requestedDate}`)
				.then((res) => res.json())
				.then((data) => adaptCurrencies(data));
			currencies.push(RussianRubleCurrency);
			ctx.commit('updateCurrencies', currencies);
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
