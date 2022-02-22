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
		onBeforeMount,
		ref,
	} from 'vue';
	import { useStore } from 'vuex';

	export default defineComponent({
		name: 'App',
		setup() {
			const store = useStore();
			const isLoading = ref(true);
			const isLoadError = ref(false);

			onBeforeMount(async () => {
				await store.dispatch('fetchCurrencies')
					.catch((error) => {
						isLoadError.value = true;
						console.error(error);
					});
				isLoading.value = false;
			});

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
