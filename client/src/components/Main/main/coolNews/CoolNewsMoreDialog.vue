<template>
	<VDialog v-model="visibility" scrollable>
		<VCard width="800">
			<VCardTitle>
				<VRow no-gutters>
					<VCol cols="11">
						{{ moreDialogContent.title || '--' }}
					</VCol>
					<VCol cols="1" class="text-right" >
						<VIcon @click="$emit('close')">
                            mdi-close
                        </VIcon>
					</VCol>
				</VRow>
			</VCardTitle>
			<VCardSubtitle>
				{{
					moment(moreDialogContent.created_time)
						.locale('uk')
						.startOf('hours')
						.fromNow() || '--'
				}}
			</VCardSubtitle>
			<VDivider />
			<VCardText class="pt-3">
				<div class="img__wraper" :class="{ sm: $vuetify.breakpoint.smAndDown }">
					<img :src="moreDialogContent.img" alt="" align="left" />
				</div>
				<p class="text wrapper" v-html="moreDialogContent.content">
				</p>
			</VCardText>
		</VCard>
	</VDialog>
</template>

<script>
export default {
	props: {
		visible: {
			return: true,
		},
		moreDialogContent: {
			require: true,
		},
	},
	computed: {
		visibility: {
			get() {
				return this.visible;
			},
			set() {
				return this.$emit('close');
			},
		},
	},
};
</script>

<style lang="scss" scoped>
.wrapper{
	max-width: 800px;
	img{
		max-height: 200px;
		width: 100%;
		height: 100%;
	}
}
.img__wraper {
	width: 50%;
	height: 220px;
	float: left;
	padding: 5px 10px 10px 0;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	&.sm {
		width: 100%;
		float: unset;
		height: 220px;
		padding: 0;
		padding-bottom: 10px;
		img {
			object-fit: contain;
		}
	}
}
</style>
