<template>
	<tr>
		<td>{{ player.id }}</td>
		<td>{{ player.nickname }}</td>
		<td>{{ player.name }}</td>
		<td>
			<router-link class="btn btn-outline-info d-block" :to="'/player/' + player.id">
				Подробнее
			</router-link>
		</td>
	</tr>
</template>

<script>
export default {
	name: "PlayersListItem",
	props: {
		player: {
			type: Object,
			required: true,
		}
	}
}
</script>
