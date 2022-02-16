<template>
	<VDialog v-model="visibility" scrollable>
		<VCard width="700" :disable="isLoading" :loading="isLoading">
			<VCardTitle>
				Інформація про коледж
				<VSpacer />
				<VBtn text :disabled="isChanged" @click="onReset">
					Скасувати зміни
				</VBtn>
			</VCardTitle>
			<VDivider class="mx-10" />
			<VCardText class="mt-5">
				<vue-editor
					v-model="collegeInfo.info"
					:disable="isLoading"
				></vue-editor>
			</VCardText>
			<VDivider class="mx-5" />
			<VCardActions>
				<VSpacer />
				<VBtn color="error" text @click="onCancel"> Скасувати </VBtn>
				<VBtn
					color="primary"
					@click="onUpdate"
					:disabled="isLoading || isChanged"
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
		isChanged: null,
	}),
	validations: {},
	mounted() {
		this.getInfo();
	},
	watch: {
		collegeInfo: {
			deep: true,
			handler(e) {
				this.isChanged = this.infoCopy.info === this.collegeInfo.info;
			},
		},
	},
	methods: {
		onReset() {
			this.collegeInfo = {
				...this.infoCopy,
			};
		},
		onCancel() {
			this.collegeInfo = this.infoCopy;
			this.$v.$reset();
			this.$emit('close');
		},
		async getInfo() {
			try {
				this.isLoading = true;
				let newItem = await collegeInfoServices.getAll();
				console.log("response", newItem);
				this.collegeInfo = newItem.result;
				this.infoCopy = {
					...this.collegeInfo,
				};
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
					const params = {};
					params.info = this.collegeInfo.info;
					await collegeInfoServices.update(this.collegeInfo._id, params);
					this.partner = [];
					this.$emit('changeInfoCol');
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
