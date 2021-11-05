<template>
	<loading-wrapper :is-loading="players == null">
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

		<table class="table table-striped tab">
			<thead>
			<tr>
				<th>№</th>
				<th>Ник</th>
				<th>Имя</th>
				<th>Дата рождения</th>
				<th></th>
			</tr>
			</thead>
			<tbody>
				<players-list-item
					v-for="player in players.data"
					:key="player.id"
					:player="player"
				></players-list-item>
			</tbody>
		</table>

	</loading-wrapper>
	<laravel-pagination :data="players" @load-page="loadPlayers"></laravel-pagination>
</template>

<script>
import LoadingWrapper from "@/components/Loading/LoadingWrapper";
import LaravelPagination from "@/components/Pagination/LaravelPagination";
import PlayersListItem from "@/components/Players/PlayersListItem";

export default {
	name: "PlayersList",
	components: {PlayersListItem, LaravelPagination, LoadingWrapper},
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
