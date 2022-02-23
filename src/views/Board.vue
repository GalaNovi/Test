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
			class="board__total"
		/>
		<Calendar
			v-model="currentDate"
			:inline="true"
			:maxDate="maxCalendarDate"
			class="board__calendar"
		/>
		<Toast />
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
	import { useHelpers } from '@/views/composition/helpers';
	import { useToast } from 'primevue/usetoast';
	import Toast from 'primevue/toast';

	export default defineComponent({
		name: 'Board',
		components: {
			Toast,
		},
		setup() {
			const toast = useToast();
			const store = useStore();
			const { equalCharCodes } = useHelpers();
			const maxCalendarDate = defaultStartAppDate;
			const firstCurrency = ref(undefined);
			const secondCurrency = ref(undefined);
			const firstCurrencyAmount = ref(0);
			const currentDate = ref(defaultStartAppDate);

			/** Computed */
			const currencies = computed(() => store.getters.sortedCurrencies);
			const firstCurrencyRateDenominated = computed(() => (unref(firstCurrency).value / unref(firstCurrency).nominal));
			const secondCurrencyRateDenominated = computed(() => (unref(secondCurrency).value / unref(secondCurrency).nominal));
			const result = computed(() => (unref(firstCurrency) && unref(secondCurrency) ? (unref(firstCurrencyRateDenominated) * unref(firstCurrencyAmount)) / unref(secondCurrencyRateDenominated) : 0));

			/** Methods */
			const onFirstCurrencyInput = ({ value }) => {
				firstCurrencyAmount.value = value;
			};
			const updateFirstCurrency = () => {
				firstCurrency.value = unref(currencies).find((item) => equalCharCodes(item.charCode, unref(firstCurrency).charCode));
			};
			const updateSecondCurrency = () => {
				secondCurrency.value = unref(currencies).find((item) => equalCharCodes(item.charCode, unref(secondCurrency).charCode));
			};

			watch(currentDate, async (newVal, oldVal) => {
				const newDate = newVal.toLocaleDateString('en-GB');
				const oldDate = oldVal.toLocaleDateString('en-GB');
				if (newDate !== oldDate) {
					try {
						await store.dispatch('fetchCurrencies', newDate);
						if (unref(firstCurrency)) {
							updateFirstCurrency();
						}
						if (unref(secondCurrency)) {
							updateSecondCurrency();
						}
						// if (!unref(currencies).includes(unref(firstCurrency)) || !unref(currencies).includes(unref(secondCurrency))) {
						// 	firstCurrency.value = undefined;
						// 	secondCurrency.value = undefined;
						// 	toast.add({
						// 		severity: 'error', summary: 'Error', detail: 'One or both currencies are missing on the selected date', life: 3000,
						// 	});
						// }
					} catch (error) {
						toast.add({
							severity: 'error', summary: error.name, detail: error.message, life: 3000,
						});
					}
				}
			});

			return {
				firstCurrency,
				secondCurrency,
				firstCurrencyAmount,
				currencies,
				result,
				currentDate,
				maxCalendarDate,
				onFirstCurrencyInput,
			};
		},
	});
</script>

<style lang="scss">
	@import 'src/views/styles/board/component';
</style>
