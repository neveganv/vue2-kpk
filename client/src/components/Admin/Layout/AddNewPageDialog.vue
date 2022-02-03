<template>
  <VDialog v-model="visibility" width="600" content-class="c-dialog">
    <VCard>
      <VCardTitle v-if="isEditFolder && !addPageVisibility">
        Редагувати папку
      </VCardTitle>
      <VCardTitle v-if="!addPageVisibility && !isEditFolder">
        Додати нову папку
      </VCardTitle>
      <VCardTitle v-if="addPageVisibility"> Додати нову сторінку </VCardTitle>
      <VCardText>
        <VRow >
          <VCol v-if="!editFolder">
            <VTextField
              :label="addPageVisibility ? 'Назва сторінки' : 'Назва папки'"
              :prepend-icon="
                addPageVisibility
                  ? 'mdi-note-edit-outline'
                  : 'mdi-folder-edit-outline'
              "
              outlined
              dense
              v-model="page.name"
              :hide-details="!NameError.length"
              :error-messages="NameError"
            >
            </VTextField>
          </VCol>
		  
		   <VCol v-if="editFolder">
            <VTextField
              :label="addPageVisibility ? 'Назва сторінки' : 'Назва папки'"
              :prepend-icon="
                addPageVisibility
                  ? 'mdi-note-edit-outline'
                  : 'mdi-folder-edit-outline'
              "
              outlined
              dense
              v-model="editFolder.name"
              :hide-details="!NameError.length"
              :error-messages="NameError"
            >
            </VTextField>
          </VCol>
        </VRow>

        <VRow v-if="!addPageVisibility">
          <VCol v-if="!editFolder">
            <v-select
              v-model="page.positions"
              :items="Object.values(categories)"
              attach
              :item-value="'_id'"
              :item-text="'title'"
              prepend-icon="mdi-shield-account"
              outlined
              dense
              label="Права доступу"
              multiple
              deletable-chips
              :menu-props="{ bottom: true, offsetY: true }"
              :hide-details="!PermisiionError.length"
              :error-messages="PermisiionError"
            >
              >
              <template #selection="{ item }">
                <v-chip small color="primary">{{ item.title }}</v-chip>
              </template></v-select
            >
          </VCol>
		  <VCol v-if="editFolder">
            <v-select
              v-model="editFolder.positions"
              :items="Object.values(categories)"
              attach
              :item-value="'_id'"
              :item-text="'title'"
              prepend-icon="mdi-shield-account"
              outlined
              dense
              label="Права доступу"
              multiple
              deletable-chips
              :menu-props="{ bottom: true, offsetY: true }"
              :hide-details="!PermisiionError.length"
              :error-messages="PermisiionError"
            >
              >
              <template #selection="{ item }">
                <v-chip small color="primary">{{ item.title }}</v-chip>
              </template></v-select
            >
          </VCol>
        </VRow>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn
          color="primary"
          @click="onCreateFolder"
          v-if="!addPageVisibility && !isEditFolder"
        >
          Додати Папку
        </VBtn>
        <VBtn
          color="error"
          @click="onDeleteFolder"
          v-if="!addPageVisibility && isEditFolder"
        >
          Видалити папку
        </VBtn>
        <VBtn
          color="primary"
          @click="onUpdateFolder"
          v-if="!addPageVisibility && isEditFolder"
        >
          РЕдагувати папку
        </VBtn>
        <VBtn color="primary" @click="onCreatePage" v-if="addPageVisibility">
          Додати Сторінку
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script>
import pageService from "@/request/page/pageService";
import folderService from "@/request/folders/folderService";
import positionService from "@/request/positions/positionService";
import loader from "@/mixins/loader";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import user from '@/mixins/user';


export default {
  mixins: [loader, validationMixin,user],
  data: () => ({
    page: [],
    categories: [],
  }),
  validations: {
    page: {
      name: {
        required,
      },
      positions: {
        required,
      },
    },
  },
  props: {
    visible: {
      require: true,
    },
    addPageVisibility: {
      require: false,
    },
    editFolder: {
      type: Object,
      require: false,
    },
    folder: {
      type: Object,
      require: false,
    },
    isEditFolder: {
      require: false,
    },
  },
  watch: {
    addPageVisibility: {
      deep: true,
      handler(e) {
        console.log(e);
      },
    },
    page(e){
      console.log(e)
    }
  },
  mounted() {
    this.getPositions();
  },
  methods: {
    async onCreateFolder() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          this.setLoading(true);
          const params = [];
          params.name = this.page.name;
          this.page.positions.push(this.getUser.positionUUID)
          params.positions = this.page.positions;
          await folderService
            .addFolder({
              ...params,
            })
            .then((res) => {
              this.page = [];
              this.$emit("addedFolder", res);
              this.$emit("close");
            });
          this.$v.$reset();
          this.setLoading(false);
        } catch (e) {
          alert(e);
        }
      }
    },
    async getPositions() {
      try {
        const newItems = await positionService.getAll();
        this.categories = newItems.filter(e => e._id !== this.getUser.positionUUID)
      } catch (e) {
        alert(e);
      }
    },
    async onCreatePage() {
      this.$v.page.name.$touch();
      if (!this.$v.page.name.$invalid) {
        try {
          this.setLoading(true);
          const params = [];
          params.name = this.page.name;
          params.folder = this.folder._id;
          await pageService
            .addPage({
              ...params,
            })
            .then((res) => {
              this.page = [];
              this.$emit("addNewPage", res);
              this.$emit("close");
            });
          this.$v.$reset();
          this.setLoading(false);
        } catch (e) {
          alert(e);
        }
      }
    },
    async onDeleteFolder() {
      try {
       await folderService.delete(this.editFolder._id);
        this.$router.push({ name: "admin-permission-guard" });
      } catch (e) {
        alert(e);
      }
    },
    async onUpdateFolder() {
      const params = [];
      params.name = this.editFolder.name;
      params.positions = this.editFolder.positions;
	   console.log(params)
      try {
        await folderService.update(this.editFolder._id, { ...params });
      } catch (e) {
        alert(e);
      }
	  this.$emit('update')
    },
  },
  computed: {
    NameError() {
      const errors = [];
      if (!this.$v.page.name.$dirty) {
        return errors;
      }
      if (this.isEditFolder) {
        !this.$v.page.name.required &&
          errors.push("Назва папки обов`язкове поле для заповнення");
        return errors;
      } else {
        !this.$v.page.name.required &&
          errors.push("Назва сторінки обов`язкове поле для заповнення");
        return errors;
      }
    },
    PermisiionError() {
      const errors = [];
      if (this.isEditFolder) {
        if (!this.$v.page.positions.$dirty) {
          return errors;
        }
        !this.$v.page.positions.required &&
          errors.push("Права доступу обов`язкове поле для заповнення");
      }
      return errors;
    },
    visibility: {
      get() {
        return this.visible;
      },
      set() {
        this.$emit("close");
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
