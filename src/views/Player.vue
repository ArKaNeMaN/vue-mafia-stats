<template>
	<LoadingWrapper :data="player">
		<BackButton class="float-md-end w-md-auto w-100"></BackButton>
		<h2>{{ player.nickname }}</h2>
	</LoadingWrapper>
</template>

<script>
import LoadingWrapper from "@/components/Loading/LoadingWrapper";
import BackButton from "@/components/Nav/BackButton";
export default {
	name: "Player",
	components: {BackButton, LoadingWrapper},
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
