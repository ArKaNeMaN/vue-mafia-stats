<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark rounded-3">
		<div class="container-fluid">

			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#mainNavCollapseContent"
				aria-controls="mainNavCollapseContent"
				aria-expanded="false"
				aria-label="Развернуть панель навигации"
			>
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="mainNavCollapseContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<slot></slot>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: "NavBar"
}
</script>

<style scoped>

</style>