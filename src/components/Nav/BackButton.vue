<template>
	<button
		class="btn btn-outline-secondary"
		@click="$router.back(); $event.preventDefault();"
	>
		<slot>← Назад</slot>
	</button>
</template>

<script>
export default {
	name: "BackButton"
}
</script>
