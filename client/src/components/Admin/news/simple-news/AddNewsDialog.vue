<template>
  <VDialog v-model="visibility" @click:outside="$v.$reset()">
    <VCard width="700">
      <VCardTitle v-if="visibleEdit"> Оновити новину</VCardTitle>
      <VCardTitle v-else> Створити Новину </VCardTitle>
      <VCardText>
        <VRow>
          <VCol cols="6">
            <v-select
              prepend-icon="mdi-shape"
              :items="Object.values(categories)"
              :item-value="'_id'"
              :item-text="'name'"
              v-model="news.category"
              label="Категорія"
              :error-messages="CategoryError"
              :hide-details="!CategoryError.length"
              outlined
              clearable
              dense
            >
              <template #selection="{ item }">
                <v-chip small color="primary">{{ item.name }}</v-chip>
              </template></v-select
            >
          </VCol>
          <VCol cols="6">
            <VBtn text color="primary" @click="visibleAdd = true">
              <VIcon left>mdi-plus</VIcon>Додати нову категорію</VBtn
            >
          </VCol>
        </VRow>

        <VRow>
          <VCol>
            <VTextField
              label="Заголовок"
              prepend-icon="mdi-clipboard-text"
              outlined
              dense
              :hide-details="!TitleError.length"
              v-model="news.title"
              :error-messages="TitleError"
            >
            </VTextField>
          </VCol>
        </VRow>
        <VRow>
          <VCol>
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
              v-model="news.main_img"
             :error-messages="MainImageError"
              :hide-details="!MainImageError.length"
			  @change="onFileChange"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip v-if="index < 2" label small>
                  {{ text }}
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="text-overline grey--text text--darken-3 mx-2"
                >
                  +{{ news.main_img.length - 2 }} File(s)
                </span>
              </template>
            </v-file-input>
          </VCol>
        </VRow>

        тут буде едітор, но його поки немає
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn color="error" text @click="onCancel"> Скасувати </VBtn>
        <VBtn color="primary" @click="onUpdate" v-if="visibleEdit">Оновити</VBtn>
        <VBtn color="primary" @click="onCreate" v-else> Створити </VBtn>
      </VCardActions>
    </VCard>
    <add-new-category-dialog
      @addCategory="addCategory"
      :visibleAdd="visibleAdd"
      @close="visibleAdd = false"
    />
  </VDialog>
</template>

<script>
import AddNewCategoryDialog from "./AddNewCategoryDialog.vue";
import newsService from "@/request/news/newsService";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  components: {
    AddNewCategoryDialog,
  },

  data: () => ({
    rules: [
      (value) =>
        !value || value.size < 3000000 || "Зображення повинне бути менше 3 MB!",
    ],
    categories: [],
    news: [],
    visibleAdd: false,
	base64image: '',
  }),
  validations: {
    news: {
      title: {
        required,
      },
     main_img: {
        required,
      },
      category: {
        required,
      },
    },
  },
  props: {
    visible: {
      require: false,
    },
    visibleEdit: {
      require: false
    },
    chosenNews: {
      require: false
    }
  },
  mounted() {
    this.getCategories();
    this.getChosenNews();
  },
  methods: {
    addCategory() {
      this.visibleAdd = false;
      this.getCategories();
    },
    getChosenNews(){
      console.log("chosen news", this.chosenNews)
      if(this.chosenNews){
        
        this.news = this.chosenNews;
        this.news.permission = this.news.position.title;
        console.log("ch", this.chosenNews)
        console.log("Класі новини: ",this.news)
      }
      
    },
    onCancel() {
      this.news = [];
      this.$v.$reset();
      this.$emit("close");
    },
    async onCreate() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          const params = [];
          params.title = this.news.title;
          params.category = this.news.category;
          params.main_img = this.base64image;
          console.log("params", params);
          await newsService.addSimpleNew({ ...params });
          this.news = [];
          this.$emit("addNews", params);
          this.$v.$reset();
        } catch (e) {
          alert(e);
        }
      }
    },
    async onUpdate(){
       /* this.$v.$touch();
      if (!this.$v.$invalid) {*/
        try {
          const params = [];
          params.id = this.news._id
          params.title = this.news.title;
          params.category = "61a10b1b58d5cc9d3959c3d2";
          params.main_img = this.news.main_img;
          await newsService.updateSimpleNews({ ...params });
          this.$emit("close")
          this.news = [];
         // this.$v.$reset();
        } catch (e) {
          alert(e);
        }
    },
    onFileChange(files) {
      if (files) {
        const reader = new FileReader();
		reader.readAsDataURL(files);
        reader.onload = (e) => {
          this.base64image = e.target.result;
        };
      }
    },
    async getCategories() {
      try {
        this.categories = await newsService.getSimpleNewsCategories();
      } catch (e) {
        alert(e);
      }
    },
  },
  computed: {
    visibility: {
      get() {
        if(this.visible === true){
        return this.visible;
        }
        else { return this.visibleEdit; }
      },
      set() {
        this.$emit("close");
      },
    },
    CategoryError() {
      const errors = [];
      if (!this.$v.news.category.$dirty) {
        return errors;
      }
      !this.$v.news.category.required &&
        errors.push("Категорія обов`язкове поле для заповнення");
      return errors;
    },
    TitleError() {
      const errors = [];
      if (!this.$v.news.title.$dirty) {
        return errors;
      }
      !this.$v.news.title.required &&
        errors.push("Заголовок обов`язкове поле для заповнення");
      return errors;
    },
    MainImageError() {
      const errors = [];
      if (!this.$v.news.main_img.$dirty) {
        return errors;
      }
      !this.$v.news.main_img.required &&
        errors.push("Головна картинка обов`язкове поле для заповнення");
      return errors;
    },
  },
};
</script>

<style></style>
