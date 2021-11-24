<template>
  <VDialog
    v-model="visibility"
    transition="scroll-y-transition"
    @click:outside="$v.$reset()"
  >
    <VCard width="500">
      <VCardTitle> Додати нову посаду </VCardTitle>
      <VCardText>
        <VRow>
          <VCol>
            <VTextField
              label="Назва посади"
              prepend-icon="mdi-shield-account"
              outlined
              dense
              v-model="permission"
              :hide-details="!NameError.length"
              :error-messages="NameError"
            >
            </VTextField>
          </VCol>
        </VRow>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn color="primary" @click="onCreate"> Додати посаду </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script>
import positionService from "@/request/positions/positionService";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    permission: {
      required,
    },
  },
  props: {
    visibleAdd: {
      require: true,
    },
  },
  data: () => ({
    permission: "",
  }),
  methods: {
    async onCreate() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          const params = [];
          params.title = this.permission;

          await positionService.createPosition({
            ...params,
          });
          this.$emit("close");
        } catch (e) {
          alert(e);
        }
      }
    },
  },
  computed: {
    NameError() {
      const errors = [];
      if (!this.$v.permission.$dirty) {
        return errors;
      }
      !this.$v.permission.required &&
        errors.push("Назва посади обов`язкове поле для заповнення");
      return errors;
    },
    visibility: {
      get() {
        return this.visibleAdd;
      },
      set() {
        this.permission = "";
        this.$emit("close");
      },
    },
  },
};
</script>

<style></style>
