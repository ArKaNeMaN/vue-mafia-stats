<template>
	<div>
		<LoadingIndicator v-if="isInLoading"></LoadingIndicator>
		<slot v-else></slot>
	</div>
</template>

<script>
import LoadingIndicator from "@/components/Loading/LoadingIndicator";
export default {
	name: "LoadingWrapper",
	components: {LoadingIndicator},
	props: {
		data: {
			default: null,
		},
	},
	computed: {
		isInLoading(){
			return (this.data == null);
		},
	},
}
</script>

<style scoped>

</style>