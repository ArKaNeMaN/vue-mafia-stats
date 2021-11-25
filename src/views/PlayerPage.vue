<template>
	<div class="page-player">
		<BackButton class="float-md-end w-md-auto w-100"></BackButton>

		<loading-wrapper class="player-info" :is-loading="player === null">
			<h1>{{ player.nickname }}</h1>
		</loading-wrapper>

		<hr>

		<loading-wrapper class="player-games" :is-loading="gPlayers === null">
			<h3>Участия в играх</h3>

			<table class="table table-striped overflow-auto">
				<thead>
				<tr>
					<th>№</th>
					<th>Дата проведения</th>
					<th>Результат</th>
					<th>Роль</th>
				</tr>
				</thead>

				<tbody>
				<tr v-for="gPlayer in gPlayers" :key="gPlayer.id">
					<td>{{ gPlayer.game.id }}</td>
					<td>{{ utils.fmtDate(gPlayer.game.date) }}</td>
					<td>{{
							gPlayer.game.result === null ? 'Не завершена' : MafiaApi.Games.STATUS_TITLES[gPlayer.game.result]
						}}
					</td>
					<td>{{ MafiaApi.Players.ROLE_TITLES[gPlayer.role] ?? '?.?' }}</td>
					<td>
						<button class="btn btn-outline-info w-100">
							Подробнее
						</button>
					</td>
				</tr>
				</tbody>
			</table>

			<ul class="list-group" v-if="false">
				<li v-for="gPlayer in gPlayers" :key="gPlayer.id" class="list-group-item">

					#{{ gPlayer.game.id }}: {{ utils.fmtDateTime(gPlayer.game.date) }}
					<button class="btn btn-primary" @click="gPlayer._showInfo = !(gPlayer._showInfo ?? false)">
						...
					</button>

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
		this.player = await this.mafiaApi.Players.get(Number(this.$route.params.id));

		this.gPlayers = await this.mafiaApi.Players.getGPLayers(
			Number(this.$route.params.id),
			{},
			{withGames: true},
		);
	},
}
</script>
