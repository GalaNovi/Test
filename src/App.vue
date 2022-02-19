<template>
	<div v-if="!isLoading && !isLoadError" class="app">
		<header class="app__header">
			<h1 class="app__title">Currency converter</h1>
		</header>
		<main class="app__body">
			<router-view/>
		</main>
	</div>
	<p v-if="isLoading">LOADING...</p>
	<p v-if="isLoadError">Something went wrong. Please try later</p>
</template>

<script>
	import 'normalize.css';
	import {
		defineComponent,
		// onBeforeMount,
		ref,
		// unref,
	} from 'vue';
	// import adaptCurrencyRates from '@/utils/adaptCurrencyRates';

	export default defineComponent({
		name: 'App',
		setup() {
			const isLoading = ref(false);
			const isLoadError = ref(false);
			// const rates = { def: 'value' };

			// onBeforeMount(async () => {
			// 	const requestedDate = ref(new Date().toLocaleDateString());
			// 	await fetch(`http://localhost:3000/getCurrencyRates?date=${unref(requestedDate)}`)
			// 		.then((res) => res.json())
			// 		.then((data) => {
			// 			rates = adaptCurrencyRates(data);
			// 		})
			// 		.catch((error) => {
			// 			isLoadError.value = true;
			// 			isLoading.value = false;
			// 			console.error(error);
			// 		});
			// 	isLoading.value = false;
			// 	console.log(rates);
			// });

			return {
				isLoading,
				isLoadError,
			};
		},
	});
</script>

<style lang="scss">
	@import 'src/scss/styles/app';
</style>
