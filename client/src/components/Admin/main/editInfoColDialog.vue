<template>
	<VDialog v-model="visibility">
		<VCard width="700" :disable="isLoading" :loading="isLoading">
			<VCardTitle>
				Інформація про коледж
				<VSpacer />
				<VBtn text :disabled="!isChanged"> Скасувати зміни </VBtn>
			</VCardTitle>
			<VCardText>
				<vue-editor v-model="collegeInfo.info"></vue-editor>
			</VCardText>
			<VDivider />
			<VCardActions>
				<VSpacer />
				<VBtn color="error" text @click="onCancel"> Скасувати </VBtn>
				<VBtn
					color="primary"
					@click="onUpdate"
					:disabled="isLoading"
					:loading="isLoading"
				>
					Оновити
				</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
import collegeInfoServices from '@/request/collegeInfo/collegeInfoServices';
import { validationMixin } from 'vuelidate';
import { required, url } from 'vuelidate/lib/validators';
import { VueEditor } from 'vue2-editor';

export default {
	components: {
		VueEditor,
	},
	mixins: [validationMixin],

	props: {
		visible: {
			require: true,
		},
	},

	data: () => ({
		collegeInfo: [],
		isLoading: false,
		isChanged: false,
	}),
	validations: {},
	mounted() {
		this.getInfo();
	},
	methods: {
		onCancel() {
			this.$v.$reset();
			this.$emit('close');
		},
		async getInfo() {
			try {
				this.isLoading = true;
				const newItem = await collegeInfoServices.getAll();
				this.collegeInfo = newItem;
				console.log(this.collegeInfo);
				this.isLoading = false;
			} catch (e) {
				alert(e);
			}
		},
		async onUpdate() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				try {
					this.isLoading = true;
                    const params = {}
                    params.info = this.collegeInfo.info
					await collegeInfoServices.update(this.collegeInfo._id,params);
					this.partner = [];
					this.$emit('addPartner');
					this.$v.$reset();
					this.isLoading = false;
				} catch (e) {
					this.isLoading = false;
					alert(e);
				}
			}
		},
	},
	computed: {
		visibility: {
			get() {
				return this.visible;
			},
			set() {
				this.$emit('close');
			},
		},
	},
};
</script>
