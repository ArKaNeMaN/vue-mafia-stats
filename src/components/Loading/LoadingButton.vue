<template>
	<button class="btn " :class="{ disabled: isLoading }">
		<loading-indicator v-if="isLoading"></loading-indicator>
		<slot v-else></slot>
	</button>
</template>

<script>
import LoadingIndicator from "@/components/Loading/LoadingIndicator";
export default {
	name: "LoadingButton",
	components: {LoadingIndicator},
	props: {
		isLoading: {
			required: true,
		}
	},
}
</script>

<style scoped>

</style>