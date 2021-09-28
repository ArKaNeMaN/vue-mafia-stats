<template>
	<tr>
		<td>{{ player.id }}</td>
		<td>{{ player.nickname }}</td>
		<td>{{ player.name }}</td>
		<td>{{ player.birthday ? utils.fmtDate(player.birthday) : 'Не указана' }}</td>
		<td>
			<router-link tag="a" class="btn btn-outline-info d-block" :to="'/player/' + player.id">
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
