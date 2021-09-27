<template>
	<LoadingWrapper :data="players">
		<ul>
			<li v-for="player in players.data" :key="player.id">
				{{ player.nickname }} ({{ player.name }})
			</li>
		</ul>
	</LoadingWrapper>
	<Pagination :data="players" @load-page="loadPlayers"></Pagination>
</template>

<script>
import LoadingWrapper from "@/components/Loading/LoadingWrapper";
import Pagination from "@/components/Pagination/Pagination";
export default {
	name: "PlayersList",
	components: {Pagination, LoadingWrapper},
	data() {
		return {
			players: null,
		};
	},
	methods: {
		loadPlayers({ page = null, perPage = null }) {
			this.mafiaApi.Players.list(page, perPage)
				.then((data) => {
					console.log(data);
					this.players = data;
				});
		}
	},
}
</script>
