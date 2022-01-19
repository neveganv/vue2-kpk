<template>
  <VDialog v-model="visibility" :persistent="edit">
    <VCard width="700">
      <VCardTitle> Додати партнера</VCardTitle>
      <VCardText>
        <VRow>
          <VCol>
            <VTextField
              label="Посилання"
              prepend-icon="mdi-link"
              outlined
              dense
              :hide-details="!linkError.length"
              :error-messages="linkError"
              v-model="partner.link"
              @input.native="$v.partner.link.$touch()"
            >
            </VTextField>
          </VCol>
        </VRow>
        <VRow>
          <VCol class="py-0">
            <v-file-input
              dense
              counter
              label="Головна картинка"
              placeholder="Головна картинка"
              prepend-icon="mdi-camera"
              outlined
              accept="image/png, image/jpeg, image/svg"
              :show-size="1000"
              :rules="rules"
              v-model="partner.image"
              @change="onFileChange"
              :error-messages="imageError"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip v-if="index < 2" label small>
                  {{ text }}
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="text-overline grey--text text--darken-3 mx-2"
                >
                  +{{ partner.image.length - 2 }} File(s)
                </span>
              </template>
            </v-file-input>
          </VCol>
        </VRow>
      </VCardText>
      <VDivider />
      <VCardActions>
        <VSpacer />
        <VBtn color="error" text @click="onCancel"> Скасувати </VBtn>
        <VBtn
          color="primary"
          @click="onUpdate"
          v-if="edit"
          :disabled="isLoading"
          :loading="isLoading"
        >
          Оновити
        </VBtn>
        <VBtn
          color="primary"
          @click="onCreate"
          v-else
          :disabled="isLoading"
          :loading="isLoading"
        >
          Створити
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script>
//import usersService from '@/request/users/usersService';
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  name: "add-users-dialog",
  mixins: [validationMixin],

  props: {
    visible: {
      require: true,
    },
  },

  data: () => ({
    rules: [
      (value) =>
        !value || value.size < 3000000 || "Зображення повинне бути менше 3 MB!",
    ],
    partner: [],
    isLoading: false,
  }),
  validations: {
    partner: {
      link: {
        required,
      },
      image: {
        required,
      },
    },
  },
  mounted() {},
  methods: {
    onCancel() {
      this.user = [];
      this.$v.$reset();
      this.$emit("close");
    },
    async onCreate() {
      this.$v.$touch();
      // if (!this.$v.$invalid) {
      // 	try {
      // 		this.isLoading = true;
      // 		const params = [];
      // 		params.name = this.user.name;
      // 		params.surname = this.user.surname;
      // 		params.email = this.user.email;
      // 		params.phone = this.user.phone;
      // 		params.position = this.user.permission;

      // 		await usersService.addNewUser({
      // 			...params,
      // 		});
      // 		this.user = [];
      // 		this.$emit('addUser');
      // 		this.$v.$reset();
      // 		this.isLoading = false;
      // 	} catch (e) {
      // 		alert(e);
      // 	}
      // }
    },
  },
  computed: {
    visibility: {
      get() {
        return this.visible;
      },
      set() {
        this.$emit("close");
      },
    },
    linkError() {
      const errors = [];
      if (!this.$v.partner.link.$dirty) {
        return errors;
      }
      !this.$v.partner.link.required &&
        errors.push("Посилання обов`язкове поле для заповнення");
      return errors;
    },
    imageError() {
      const errors = [];
      if (!this.$v.partner.image.$dirty) {
        return errors;
      }
      !this.$v.partner.image.required &&
        errors.push("Картинка обов`язкове поле для заповнення");
      return errors;
    },
  },
};
</script>
