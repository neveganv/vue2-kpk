<template>
	<div>
		<h3 class="pb-3 pl-2">Навігація</h3>
		<ul>
			<li
                @click="scrollTo(item)"
				v-for="item in navigateData"
				:key="item.value"
				:class="{ active: item.value === activeNavigator }"
			>
				{{ item.text }}
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		activeNavigator: {
			require: true,
		},
	},
	watch: {
		activeNavigator: {
			deep: true,
			handler(e) {
				console.log(e);
			},
		},
	},
	data: () => ({
		navigateData: [
			{
				text: 'Головна',
				value: 'MainComponent',
			},
			{
				text: 'Нещодавні новини',
				value: 'RecentNewsComponent',
			},
			{
				text: 'Спеціальності',
				value: 'SpecialitiesComponent',
			},
			{
				text: 'Про Коледж',
				value: 'AboutComponent',
			},
			{
				text: 'Новини коледжу',
				value: 'NewsComponent',
			},
			{
				text: 'Інформація',
				value: 'InformationComponent',
			},
			{
				text: 'ВИБОРИ ДИРЕКТОРА',
				value: null,
				link:"https://kpk-lp.com.ua/page/63a477e43052e64364e0de68"
			},
		],
	}),
    methods:{
        scrollTo({value,link}){
			if(!value){
     	 	window.open(link, "_blank");
			}else{
				this.$emit('scrollTo',value)
			}
        }
    },
	mounted() {
		console.log(this.navigateData);
	},
};
</script>

<style lang="scss" scoped>
ul {
	list-style-type: none;
}
li {
	margin: 0;
	padding: 5px 10px;
	border-left: 2.5px solid #e5e5e5;
	color: rgb(126, 126, 126);
	cursor: pointer;
	font-size: 14px;
	&:hover {
		color: rgb(77, 77, 77);
	}
	&.active {
		border-left: 2.5px solid #ef876d;
		color: #ef876d;
	}
}
</style>
