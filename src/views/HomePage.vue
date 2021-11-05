<template>
	<div class="home">
		<h1>Главная страница</h1>
		<players-list></players-list>
	</div>
</template>

<script>
import PlayersList from "@/components/Players/PlayersList";
export default {
  name: 'HomePage',
  components: {PlayersList}
}
</script>
