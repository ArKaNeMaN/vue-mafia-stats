<template>
	<div class="m-2 d-flex flex-lg-row flex-column flex-fill justify-content-between card p-3">
		<h4 class="align-self-center">{{ player.nickname }}</h4>
		<div class="p-3">
			<p><span class="fw-bold">Имя: </span><span>{{ player.name }}</span></p>
			<p><span class="fw-bold">Дата рождения: </span><span>{{ player.birthday ? utils.fmtDate(player.birthday) : 'Не указана' }}</span></p>
		</div>
		<div class="p-3">
			<router-link tag="a" class="btn btn-outline-info d-block" :to="'/player/' + player.id">Подробнее</router-link>
		</div>
	</div>
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
