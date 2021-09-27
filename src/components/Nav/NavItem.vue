<template>
	<li class="nav-item">
		<router-link :to="url" tag="a" class="nav-link" aria-current="page" active-class="active">
			{{ title }}
		</router-link>
	</li>
</template>

<script>
export default {
	name: "NavItem",
	props: {
		title: {
			type: String,
			required: true
		},
		url: {
			type: String,
			required: true
		}
	}
}
</script>

<style scoped>

</style>