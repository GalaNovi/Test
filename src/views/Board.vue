<template>
	<div class="board">
		<div class="board__container">
			<section class="board-currencies">
				<h2 class="board-currencies__title">Initial currency</h2>
				<ul class="board-currencies-list">
					<li
						v-for="item in 29"
						:key="`board-currencies-list-item-${item}`"
						class="board-currencies-list__item"
					>
						<button
							type="button"
							title="American dollar"
							class="board-currencies-list__button"
						>USD</button>
					</li>
				</ul>
			</section>
		</div>
	</div>
</template>

<script>
	import {
		defineComponent,
	} from 'vue';

	export default defineComponent({
		name: 'Board',
	});
</script>

<style lang="scss">
	@import 'src/views/styles/board/component';
</style>
