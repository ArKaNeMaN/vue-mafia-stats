<template>
<div class="page-player">
	<BackButton class="float-md-end w-md-auto w-100"></BackButton>

	<loading-wrapper class="player-info" :is-loading="player === null">
		<h2>{{ player.nickname }}</h2>
	</loading-wrapper>

	<hr>

	<loading-wrapper class="player-games" :is-loading="gPlayers === null">
		<h2>Games count: {{ gPlayers.length }}</h2>

		<ul class="list-group">
			<li v-for="gPlayer in gPlayers" :key="gPlayer.id" class="list-group-item">

				#{{ gPlayer.game.id }}: {{ utils.fmtDateTime(gPlayer.game.date_time) }}
				<button class="btn btn-primary" @click="gPlayer._showInfo = !(gPlayer._showInfo ?? false)">...</button>

				<br>

				<code v-if="gPlayer._showInfo" class="card p-2 mt-3">
					<pre>{{ JSON.stringify(gPlayer, null, 2) }}</pre>
				</code>
			</li>
		</ul>
	</loading-wrapper>
</div>
</template>

<script>
import LoadingWrapper from "@/components/Loading/LoadingWrapper";
import BackButton from "@/components/Nav/BackButton";
export default {
	name: "PlayerPage",
	components: {BackButton, LoadingWrapper},

	data() {
		return {
			player: null,
			gPlayers: null,
		};
	},

	async mounted() {
		this.player = await this.mafiaApi.Players.get(this.$route.params.id);

		this.gPlayers = await this.mafiaApi.Players.getGPLayers(
			Number(this.$route.params.id),
			{},
			{ withGames: true },
		);
	},
}
</script>
