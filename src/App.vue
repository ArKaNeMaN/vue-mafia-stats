<template>
	<div class="container">
		<div class="row">
			<page-header>Mafia Stats</page-header>

			<nav-bar>
				<nav-item url="/" title="Главная"></nav-item>
				<nav-item url="/about" title="Инфо"></nav-item>
			</nav-bar>

			<div id="page-content" class="px-2 py-4">
				<router-view/>
			</div>
		</div>
	</div>
</template>

<script>
import NavBar from "@/components/Nav/NavBar";
import NavItem from "@/components/Nav/NavItem";
import PageHeader from "@/components/PageHeader";

export default {
	components: {PageHeader, NavItem, NavBar}
}
</script>