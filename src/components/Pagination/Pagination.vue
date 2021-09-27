<template>
	<div class="d-flex justify-content-center">
		<nav>
			<ul class="pagination">

				<li
					v-if="firstLastButtons"
					:class="{ disabled: curPage === firstPage }"
					class="page-item"
				>
					<a
						class="page-link"
						@click="goToPage(firstPage)"
					>‹‹</a>
				</li>

				<li
					v-if="prevNextButtons"
					:class="{ disabled: prevPage == null }"
					class="page-item"
				>
					<a
						class="page-link"
						@click="goToPage(prevPage)"
					>‹</a>
				</li>

				<li
					v-for="page in pages"
					:key="page"
					class="page-item"
					:class="{ active: page === curPage, disabled: page === null }"
				>
					<a
						v-if="page !== null"
						class="page-link"
						@click="goToPage(page)"
					>{{ page }}</a>
					<a
						v-else
						class="page-link disabled"
					>{{ this.fillerNavList }}</a>
				</li>

				<li
					v-if="prevNextButtons"
					:class="{ disabled: nextPage == null }"
					class="page-item"
				>
					<a
						class="page-link"
						@click="goToPage(nextPage)"
					>›</a>
				</li>

				<li
					v-if="firstLastButtons"
					:class="{ disabled: curPage === lastPage }"
					class="page-item"
				>
					<a
						class="page-link"
						@click="goToPage(lastPage)"
					>››</a>
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
		},

		linksNum: {
			default: 3,
			type: Number,
		},

		firstLastButtons: {
			default: true,
			type: Boolean,
		},

		prevNextButtons: {
			default: true,
			type: Boolean,
		},

		fillNavList: {
			default: false,
			type: Boolean,
		},

		fillerNavList: {
			default: '.',
			type: String,
		},
	},

	data() {
		return {
			firstPage: 1,
		};
	},

	mounted() {
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

		goToPage(p) {
			this.$router.push(this.buildRoute(p));
			this.emitLoadPage(p);
		},

		buildRoute(p) {
			let q = {
				...this.$route.query,
				p,
				pp: this.perPage,
			};

			let str = [];
			for(let p in q)
				if(q[p] !== null)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(q[p]));

			return '?' + str.join("&");
		},
	},

	computed: {
		perPage() {
			return this.$route.query.pp ?? null;
		},

		page() {
			return this.$route.query.p ?? 1;
		},

		pages() {
			if(this.data === null)
				return [];

			let pages = [];
			for(let i = this.curPage - this.linksNum; i <= this.curPage + this.linksNum; i++){
				if(
					i >= this.pagesStart
					&& i <= this.pagesEnd
				)
					pages.push(i);
				else if(this.fillNavList)
					pages.push(null);
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
			return Math.max(this.firstPage, this.curPage - this.linksNum);
		},

		pagesEnd(){
			if(this.data === null)
				return 1;
			return Math.min(this.lastPage, this.curPage + this.linksNum);
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

<style scoped type="text/scss">
	.pagination{
		li{
			cursor: pointer;
		}
	}
</style>
