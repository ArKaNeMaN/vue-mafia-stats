<template>
	<div class="container">
		<div class="row">
			<Header>Mafia Stats</Header>

			<NavBar>
				<NavItem url="/" title="Главная"></NavItem>
				<NavItem url="/about" title="Инфо"></NavItem>
			</NavBar>

			<div id="page-content" class="p-4">
				<router-view/>
			</div>
		</div>
	</div>
</template>

<script>
	import NavBar from "@/components/Nav/NavBar";
	import NavItem from "@/components/Nav/NavItem";
	import Header from "@/components/Header";

	export default {
		components: {Header, NavItem, NavBar}
	}
</script>