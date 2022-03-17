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
						hide-details="auto"
						:error-messages="NameError"
					>
						<template slot="append" >
							<VMenu offset-y :close-on-content-click="false">
								<template v-slot:activator="{ on, attrs }">
									<div class="color-wrapper" v-bind="attrs" v-on="on">
										<span :style="`background: ${colorClass}`"></span>
										<VIcon> mdi-menu-down </VIcon>
									</div>
								</template>
								<ColorPicker v-model="colorClass"></ColorPicker> </VMenu
						></template>
					</VTextField>
				</div>
			</VCardText>
			<VCardActions>
				<VSpacer />
				<span v-text="ColorError[0]" v-if="ColorError" class="error--text mr-3">
				</span>
				<VBtn color="primary" @click="onCreate" :loading="isLoading" :disabled="isLoading">Додати пару</VBtn>
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
		colorClass: {
			required,
		},
	},
	props: {
		visible: {
			require: true,
		},
	},
	data: () => ({
		isLoading:false,
		className: '',
		colorClass: '',
	}),
	methods: {
		async onCreate() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				try {
					this.isLoading = true
					const params = {};
					params.name = this.className;
					params.color = this.colorClass;
					await classService.createClasses({ ...params });
					this.$emit('addClass', params);
					this.$v.$reset();
					console.log(params);
					this.className = '';
						this.isLoading = false
				} catch (e) {
						this.isLoading = false
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
		ColorError() {
			const errors = [];
			if (!this.$v.colorClass.$dirty) {
				return errors;
			}
			!this.$v.colorClass.required &&
				errors.push('Виберіть колір пари');
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
		width: 22px;
		height: 22px;
		border: 1px solid #e3e3e3;
		border-radius: 4px;
		display: block;
	}
}
</style>
