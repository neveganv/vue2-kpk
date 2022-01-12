<template>
	<v-navigation-drawer fixed right v-model="navVisible" class="overflow-hidden" mobile-breakpoint="1626" >
		<div class="navigation">
			<v-sheet>
				<v-container style="height: auto">
					<!-- <VCardTitle> Навігація </VCardTitle> -->
					<VSubheader>Партнери</VSubheader>
					<div class="sponsor__wrapper">
						<div
							class="sponsor__inner"
							v-for="sponsor in sponsors"
							:key="sponsor.id"
							@click="onClickSponsor(sponsor.link)"
						>
							<img
								:src="require('@/assets/img/' + sponsor.img_path)"
								alt=""
								draggable="false"
							/>
						</div>
						<div class="w-100 d-flex align-center justify-center">
							<VBtn color="purple" outlined small>
								<VIcon small>mdi-handshake</VIcon>
								Стати спонсором
							</VBtn>
						</div>
					</div>
				</v-container>
			</v-sheet>
		</div>
	</v-navigation-drawer>
</template>

<script>
export default {
	methods: {
		onBurger() {
			this.$emit('onBurgerNav');
		},
		onClickSponsor(link) {
			window.open(link, '_blank');
		},
	},
	watch: {
		navigationRight: {
			deep: true,
			handler(e) {
				console.log(e);
			},
		},
	},
	data: () => ({
		sponsors: [
			{
				id: 1,
				img_path: 'it-cluster.png',
				title: 'it-cluster',
				link: 'https://it-cluster.if.ua/members/%d0%b2%d1%81%d0%bf-%d0%ba%d0%be%d0%bb%d0%be%d0%bc%d0%b8%d0%b9%d1%81%d1%8c%d0%ba%d0%b8%d0%b9-%d0%bf%d0%be%d0%bb%d1%96%d1%82%d0%b5%d1%85%d0%bd%d1%96%d1%87%d0%bd%d0%b8%d0%b9-%d0%ba%d0%be%d0%bb%d0%b5/',
			},
			{
				id: 2,
				img_path: 'uzyau.png',
				title: 'testportal',
				link: 'https://testportal.gov.ua/',
			},
		],
	}),
	computed: {
		navVisible: {
			get() {
				return this.navigationRight;
			},
			set(e) {
				return e;
			},
		},
	},
	props: {
		navigationRight: {
			require: true,
		},
	},
};
</script>

<style lang="scss">
.navigation {
	&::-webkit-scrollbar {
		width: 8px !important;
		height: 12px;
		background-color: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(113, 113, 113, 0.3);
		border: thin solid rgb(245, 245, 244);
		border-radius: 9em;
	}
	&::-webkit-scrollbar-thumb:hover {
		background-color: darken(rgba(113, 113, 113, 0.5), 4);
	}
}
.sponsor__wrapper {
	width: 100%;
	padding-left: 20px;
	.sponsor__inner {
		margin-bottom: 20px;
		max-width: 170px;
		height: 50px;
		width: 100%;
		border-radius: 5px;
		cursor: pointer;
		position: relative;
		padding: 4px;
		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
		&:hover {
			opacity: 0.9;
			&::after {
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				left: 0;
				bottom: 0;
				background: rgba(#0000, 0.03);
				border-radius: 5px;
				z-index: 100;
			}
		}
	}
}
</style>
