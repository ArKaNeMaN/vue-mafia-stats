<template>
	<component :is="tag">
		<loading-indicator v-if="isLoading" class="p-2"></loading-indicator>
		<slot v-else></slot>
	</component>
</template>

<script>
import LoadingIndicator from "./LoadingIndicator";
export default {
	name: "LoadingWrapper",
	components: {LoadingIndicator},
	props: {
		isLoading: {
			required: true,
		},
		tag: {
			default: 'div',
			required: false,
			type: String,
		}
	},
}
</script>
