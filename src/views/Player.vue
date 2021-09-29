<template>
  <div class="page-player">
    <BackButton class="float-md-end w-md-auto w-100"></BackButton>
    <div class="player-info">
      <LoadingWrapper :data="player">
        <h2>{{ player.nickname }}</h2>
      </LoadingWrapper>
    </div>
    <hr>
    <div class="player-games">
      <LoadingWrapper :data="games">
        <h2>Games count: {{ games.length }}</h2>

        <ul class="list-group">
          <li v-for="game in games" :key="game.id" class="list-group-item">
            #{{ game.id }}: {{ utils.fmtDateTime(game.date_time) }}
            <button class="btn btn-primary" @click="game._showInfo = !(game._showInfo ?? false)">...</button>
            <br>
            <code v-if="game._showInfo" class="card p-2 mt-3">
              <pre>{{ JSON.stringify(game, null, 2) }}</pre>
            </code>
          </li>
        </ul>

      </LoadingWrapper>
    </div>
  </div>
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
      games: null,
		};
	},
	mounted() {
		this.mafiaApi.Players.get(this.$route.params.id)
			.then((data) => {
				this.player = data;
			});
		this.mafiaApi.Players.getGames(this.$route.params.id)
			.then((data) => {
				this.games = data;
			});
	},
}
</script>
