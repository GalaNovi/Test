<template>
	<div class="board">
		<div class="board__currency board-currency">
			<h3 class="board-currency__title">First currency</h3>
			<Dropdown
				v-model="firstCurrency"
				:options="currencies"
				:filter="true"
				:loading="!currencies.length"
				optionLabel="name"
				placeholder="Select currency"
				class="board-currency__dropdown"
			/>
		</div>
		<div class="board__currency board-currency">
			<h3 class="board-currency__title">Second currency</h3>
			<Dropdown
				v-model="secondCurrency"
				:options="currencies"
				:filter="true"
				:loading="!currencies.length"
				optionLabel="name"
				placeholder="Select currency"
				class="board-currency__dropdown"
			/>
		</div>
		<InputNumber
			@input="onFirstCurrencyInput"
			v-model="firstCurrencyAmount"
			:disabled="!firstCurrency"
			:mode="firstCurrency && 'currency'"
			:currency="firstCurrency && firstCurrency.charCode"
		/>
		<InputNumber
			v-model="result"
			:mode="secondCurrency && 'currency'"
			:currency="secondCurrency && secondCurrency.charCode"
			disabled
		/>
		<Calendar
			v-model="date"
			:value="date"
			:inline="true"
			class="board__calendar"
		/>
	</div>
</template>

<script>
	import {
		computed,
		defineComponent,
		ref,
		unref,
		watch,
	} from 'vue';
	import { useStore } from 'vuex';
	import { defaultStartAppDate } from '@/constants/defaultStartAppDate';

	export default defineComponent({
		name: 'Board',
		setup() {
			const store = useStore();
			const currencies = computed(() => store.getters.sortedCurrencies);
			const firstCurrency = ref(undefined);
			const secondCurrency = ref(undefined);
			const firstCurrencyAmount = ref(0);
			const date = ref(defaultStartAppDate);

			/** Computed */
			const firstCurrencyRateDenominated = computed(() => (unref(firstCurrency).value / unref(firstCurrency).nominal));
			const secondCurrencyRateDenominated = computed(() => (unref(secondCurrency).value / unref(secondCurrency).nominal));
			const result = computed(() => (unref(firstCurrency) && unref(secondCurrency) ? (unref(firstCurrencyRateDenominated) * unref(firstCurrencyAmount)) / unref(secondCurrencyRateDenominated) : undefined));

			/** Methods */
			const onFirstCurrencyInput = ({ value }) => {
				firstCurrencyAmount.value = value;
			};

			watch(date, (newVal, oldVal) => {
				const newDate = newVal.toLocaleDateString('en-GB');
				const oldDate = oldVal.toLocaleDateString('en-GB');
				if (newDate !== oldDate) {
					store.dispatch('fetchCurrencies', newDate);
				}
			});

			return {
				firstCurrency,
				secondCurrency,
				firstCurrencyAmount,
				currencies,
				result,
				date,
				onFirstCurrencyInput,
			};
		},
	});
</script>

<style lang="scss">
	@import 'src/views/styles/board/component';
</style>
