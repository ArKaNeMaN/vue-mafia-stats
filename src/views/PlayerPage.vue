<template>
	<div class="page-player">
		<BackButton class="float-md-end w-md-auto w-100"></BackButton>

		<loading-wrapper class="player-info" :is-loading="player === null">
			<h1>{{ player.nickname }}</h1>
		</loading-wrapper>

		<hr>

		<div class="row">
			<div class="player-games col-lg-6">
				<h3>Участия в играх</h3>

				<loading-wrapper :is-loading="gPlayers === null">
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
				</loading-wrapper>
			</div>

			<div class="player-win-rates col-lg-6">
				<h3>Проценты побед</h3>

				<loading-wrapper :is-loading="winRates === null">
					<table class="table table-striped overflow-auto">
						<thead>
						<tr>
							<th>Роль</th>
							<th>Процент побед</th>
						</tr>
						</thead>

						<tbody>
						<tr v-for="(rate, role) in winRates" :key="role">
							<td>{{ getRoleTitle(role) }}</td>
							<td><b>{{ p(rate) }}</b> %</td>
						</tr>
						</tbody>
					</table>
				</loading-wrapper>
			</div>
		</div>
		<hr>
		<div class="p-3" v-if="score !== null">
			Всего очков: {{ score.score }}
		</div>

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
			winRates: null,
			score: null,
		};
	},

	async mounted() {
		this.player = await this.mafiaApi.Players.get(Number(this.$route.params.id));

		this.gPlayers = await this.mafiaApi.Players.getGPLayers(
			Number(this.$route.params.id),
			{},
			{withGames: true},
		);

		this.winRates = await this.mafiaApi.Players.getWinRates(Number(this.$route.params.id));
		this.score = await this.mafiaApi.Players.getScore(Number(this.$route.params.id));
	},

	methods: {
		getRoleTitle(role) {
			switch (role) {
				case 'all':
					return 'Все';
				case 'red':
					return 'Мирный';
				case 'black':
					return 'Мафия';
				case 'sheriff':
					return 'Шериф';
				case 'don':
					return 'Дон';
			}
		},
		p(rate) {
			return Math.round(rate * 100);
		},
	},
}
</script>
