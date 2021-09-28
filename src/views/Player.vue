<template>
	<LoadingWrapper :data="player">
		<button class="btn btn-outline-secondary float-md-end w-md-auto w-100" @click="$router.back()">← Назад</button>
		<h2>{{ player.nickname }}</h2>
	</LoadingWrapper>
</template>

<script>
import LoadingWrapper from "@/components/Loading/LoadingWrapper";
export default {
	name: "Player",
	components: {LoadingWrapper},
	data() {
		return {
			player: null,
		};
	},
	mounted() {
		this.mafiaApi.Players.get(this.$route.params.id)
			.then((data) => {
				this.player = data;
			});
	},
}
</script>
