<template>
	<div class="home">
		<h1>Главная страница</h1>
		<PlayersList></PlayersList>
	</div>
</template>

<script>
import PlayersList from "@/components/Players/PlayersList";
export default {
  name: 'Home',
  components: {PlayersList}
}
</script>
