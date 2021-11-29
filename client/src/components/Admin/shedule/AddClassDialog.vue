<template>
	<VDialog
		v-model="visibility"
		transition="scroll-y-transition"
		@click:outside="$v.$reset()"
	>
		<VCard width="500">
			<VCardTitle> Додати нову пару </VCardTitle>
			<VCardText>
				<VRow>
					<VCol> </VCol>
				</VRow>
				<div class="d-flex">
					<VTextField
						label="Назва пари"
						prepend-icon="mdi-account-multiple-plus"
						outlined
						dense
						:color="colorClass"
						v-model="className"
						:hide-details="!NameError.length"
						:error-messages="NameError"
					>
						<template slot="append">
							<VMenu offset-y :close-on-content-click="false">
								<template v-slot:activator="{ on, attrs }">
									<div class="color-wrapper" v-bind="attrs" v-on="on">
										<span :style="`background: ${colorClass}`"></span>
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M8.71005 11.71L11.3001 14.3C11.6901 14.69 12.3201 14.69 12.7101 14.3L15.3001 11.71C15.9301 11.08 15.4801 10 14.5901 10H9.41005C8.52005 10 8.08005 11.08 8.71005 11.71Z"
												fill="#676767"
											/>
										</svg>
									</div>
								</template>
								<ColorPicker v-model="colorClass"></ColorPicker> </VMenu
						></template>
					</VTextField>
				</div>
			</VCardText>
			<VCardActions>
				<VSpacer />
				<VBtn color="primary" @click="onCreate">Додати пару</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
import classService from '@/request/shedule/classService';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import ColorPicker from '@/common/colorPicker.vue';

export default {
	mixins: [validationMixin],
	validations: {
		className: {
			required,
		},
	},
	props: {
		visible: {
			require: true,
		},
	},
	data: () => ({
		className: '',
		colorClass: '',
	}),
	methods: {
		async onCreate() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				try {
					const params = {};
					params.name = this.className;
					params.color = this.colorClass;
					await classService.createClasses({ ...params });
					this.$emit('addClass', params);
					this.$v.$reset();
					console.log(params);
					this.className = '';
				} catch (e) {
					alert(e);
				}
			}
		},
	},
	components: {
		ColorPicker,
	},
	watch: {
		colorNewTab(e) {
			this.colorClass = e;
		},
	},
	computed: {
		NameError() {
			const errors = [];
			if (!this.$v.className.$dirty) {
				return errors;
			}
			!this.$v.className.required &&
				errors.push('Назва пари обов`язкове поле для заповнення');
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
<style lang="scss" scoped>
.color-wrapper {
	display: flex;
	align-items: center;
	span {
		width: 14px;
		height: 14px;
		border: 1px solid #676767;
		border-radius: 50%;
		display: block;
	}
}
</style>
