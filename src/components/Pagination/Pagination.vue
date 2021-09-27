<template>
	<div class="d-flex justify-content-center">
		<nav>
			<ul class="pagination">

				<li
					:class="{ disabled: curPage === firstPage }"
					class="page-item"
				>
					<router-link :to="buildQueryString(firstPage)" tag="a" class="page-link" @click="emitLoadPage(firstPage)">‹‹</router-link>
				</li>

				<li
					:class="{ disabled: prevPage == null }"
					class="page-item"
				>
					<router-link :to="buildQueryString(prevPage)" tag="a" class="page-link" @click="emitLoadPage(prevPage)">‹</router-link>
				</li>

				<li
					v-for="page in pages"
					:key="page"
					class="page-item"
					:class="{ active: page === curPage }"
				>
					<router-link :to="buildQueryString(page)" tag="a" class="page-link" @click="emitLoadPage(page)">{{ page }}</router-link>
				</li>

				<li
					:class="{ disabled: nextPage == null }"
					class="page-item"
				>
					<router-link :to="buildQueryString(nextPage)" tag="a" class="page-link" @click="emitLoadPage(nextPage)">›</router-link>
				</li>

				<li
					:class="{ disabled: curPage === lastPage }"
					class="page-item"
				>
					<router-link :to="buildQueryString(lastPage)" tag="a" class="page-link" @click="emitLoadPage(lastPage)">››</router-link>
				</li>

			</ul>
		</nav>
	</div>
</template>

// TODO: Подружить это всё с историей роутов.

<script>
export default {
	name: "Pagination",

	emits: {
		loadPage: null
	},

	props: {
		data: {
			default: null,
			type: Object,
		}
	},

	data() {
		return {
			page: 1,
			perPage: null,
			firstPage: 1,
		};
	},

	mounted() {
		let q = this.$router.currentRoute.value.query;

		this.page = q.p ?? 1;
		this.perPage = q.pp ?? null;

		this.emitLoadPage(this.page);
	},

	methods: {
		emitLoadPage(p) {
			if(p === null)
				return;

			this.$emit('loadPage', {
				page: p,
				perPage: this.perPage,
			});
			this.page = p;
		},

		buildQuery(p) {
			let q = { p };
			if(this.perPage !== null)
				q.pp = this.perPage;
			return q;
		},

		buildQueryString(p) {
			let qs = '?';
			qs += '&p=' + p;
			if(this.perPage !== null)
				qs += '&pp=' + this.perPage;

			return qs;
		},
	},

	computed: {
		pages() {
			if(this.data === null)
				return [];

			let pages = [];
			for(let i = this.pagesStart; i <= this.pagesEnd; i++){
				pages.push(i);
			}

			return pages;
		},

		lastPage(){
			if(this.data === null)
				return 1;
			return this.data.last_page;
		},

		curPage(){
			if(this.data === null)
				return 1;
			return this.data.current_page;
		},

		pagesStart(){
			if(this.data === null)
				return 1;
			return Math.max(this.firstPage, this.curPage - 3);
		},

		pagesEnd(){
			if(this.data === null)
				return 1;
			return Math.min(this.lastPage, this.curPage + 3);
		},

		prevPage(){
			if(this.data === null)
				return 1;
			return (this.curPage - 1 < this.firstPage) ? null : this.curPage - 1;
		},

		nextPage(){
			if(this.data === null)
				return 1;
			return (this.curPage + 1 > this.lastPage) ? null : this.curPage + 1;
		},
	},
}
</script>

<style scoped>

</style>