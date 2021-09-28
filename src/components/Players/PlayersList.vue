<template>
	<LoadingWrapper :data="players">
		<form @submit="doSearch" class="p-3">
			<div class="input-group">
				<input
					v-model="inputSearch"
					class="form-control"
					type="text"
					placeholder="Поисковой запрос"
				>
				<button class="btn btn-primary collapse-horizontal">Найти</button>
			</div>
		</form>

		<div class="d-flex flex-wrap flex-fill flex-md-row flex-column flex-wrap justify-content-between">
			<PlayersListItem
				v-for="player in players.data"
				:key="player.id"
				:player="player"
			></PlayersListItem>
		</div>
	</LoadingWrapper>
	<Pagination :data="players" @load-page="loadPlayers"></Pagination>
</template>

<script>
import LoadingWrapper from "@/components/Loading/LoadingWrapper";
import Pagination from "@/components/Pagination/Pagination";
import PlayersListItem from "@/components/Players/PlayersListItem";
export default {
	name: "PlayersList",
	components: {PlayersListItem, Pagination, LoadingWrapper},
	data() {
		return {
			players: null,
			inputSearch: '',
		};
	},
	mounted() {
		this.inputSearch = this.search;
	},
	methods: {
		loadPlayers(pagination = {page: this.page, perPage: this.perPage}) {
			this.mafiaApi.Players.search({s: `%${this.search}%`}, pagination)
				.then((data) => {
					this.players = data;
				});
		},

		doSearch(e) {
			e.preventDefault();

			this.setQueryParams({
				search: this.inputSearch ?? null,
				p: null
			}).then(() => {
				this.loadPlayers();
			});
		},

		setQueryParams(q) {
			return this.$router.push(
				this.buildQueryString({
					...this.$route.query,
					...q,
				})
			);
		},

		buildQueryString(q) {
			let str = [];
			for(let p in q)
				if(q[p] !== null)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(q[p]));
			return '?' + str.join('&');
		},
	},
	computed: {
		search() {
			return this.$route.query.search ?? '';
		},

		perPage() {
			return this.$route.query.pp ?? null;
		},

		page() {
			return this.$route.query.p ?? 1;
		},
	},
}
</script>
