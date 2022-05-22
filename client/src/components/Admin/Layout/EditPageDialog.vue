<template>
	<VDialog v-model="visibility" width="600" content-class="c-dialog">
		<VCard :disabled="isLoading" :loading="isLoading">
			<VCardTitle> Редагувати сторінку </VCardTitle>
			<VCardText>
				<VCol>
					<VTextField
						label="Назва сторінки"
						prepend-icon="mdi-note-edit-outline"
						outlined
						dense
						v-model="page.name"
						:hide-details="!NameError.length"
						:error-messages="NameError"
					>
					</VTextField>
				</VCol>
			</VCardText>
			<VCardActions>
				<VSpacer />
				<VBtn
					color="primary"
					@click="onUpdatePage"
					:disabled="isLoading || page.name == editPage.name"
					:loading="isLoading"
				>
					Редагувати папку
				</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
import pageService from '@/request/page/pageService';
import folderService from '@/request/folders/folderService';
import positionService from '@/request/positions/positionService';
import loader from '@/mixins/loader';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import user from '@/mixins/user';

export default {
	mixins: [loader, validationMixin, user],
	data: () => ({
		page: {},
        isLoading:false
	}),
	validations: {
		page: {
			name: {
				required,
			},
			// positions: {
			//   required,
			// },
		},
	},
	props: {
		visible: {
			require: true,
		},
		editPage: {
			type: Object,
			require: false,
		},
	},
	watch: {},
	mounted() {
        this.page = { ...this.editPage };
	},
	methods: {
		async onUpdatePage() {
			try {
                this.$v.$touch()
                if(this.$v.$invalid) return
				this.isLoading = true;
				const params = [];
				params.name = this.page.name;
				await pageService.update(this.page._id, { ...params });
				this.$emit('update');
				this.isLoading = false;
			} catch (e) {
				this.isLoading = false;
				alert(e);
			}
		},
	},
	computed: {
		NameError() {
			const errors = [];
			if (!this.$v.page.name.$dirty) {
				return errors;
			}
			!this.$v.page.name.required &&
				errors.push('Назва сторінки обов`язкове поле для заповнення');
			return errors;
		},

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
<style lang="scss">
.v-dialog {
	&.c-dialog {
		overflow-y: unset !important;
	}
}
</style>
