<template>
  <div class="px-3 mb-5">
    <VRow no-gutters align="center" justify="space-between">
      <VRow>
        <VCol cols="auto"
          ><VBtn
            text
            rounded
            color="grey darken-1"
            class="white--text"
            @click="onChangeFolder"
          >
            <VIcon left> mdi-folder-edit-outline </VIcon
            >{{ folderName || "--" }}</VBtn
          ></VCol
        >
        <VIcon small>mdi-chevron-right</VIcon>
        <VCol cols="auto"
          ><VBtn text color="primary" rounded v-if="page">
            <VIcon left> mdi-file-edit-outline </VIcon>{{ page.name || "--" }}
          </VBtn></VCol
        >
      </VRow>
      <div class="d-flex">
        <VCol cols="auto"
          ><VBtn rounded color="error" text @click="deletePage"
            ><VIcon left>mdi-delete</VIcon>Видалити</VBtn
          ></VCol
        >
        <VCol cols="auto"
          ><VBtn
            rounded
            color="gray"
            text
            @click="onCancel"
            :disabled="!cancelDisabled"
            ><VIcon left>mdi-close</VIcon>Скасувати зміни</VBtn
          ></VCol
        >
        <VCol cols="auto"
          ><VBtn rounded color="success" @click="onCreate"
            ><VIcon left>mdi-check-all</VIcon>Зберегти</VBtn
          ></VCol
        >
      </div>
    </VRow>
    <VDivider class="mb-5" />
    <VRow no-gutters v-if="page" class="h-auto">
      <VCol>
        <vue-editor class="editor w-100 pl-2" v-model="page.html" />
      </VCol>
    </VRow>
    <div v-if="page.files">
      <VDivider class="my-5" />
      <VCard>
        <v-tabs centered @change="checkPdf" show-arrows>
          <v-tab v-for="pdfFile in page.files" :key="pdfFile.id">{{
            pdfFile.title
          }}</v-tab>
        </v-tabs>
        <div v-if="page.files && pdf">
          <VCardTitle>
            <VRow justify="space-between" align="center">
              <VCol class="text-left" cols="auto">{{ title }}</VCol>
              <VRow no-gutters justify="end" align="center">
                <VCol class="text-right mx-1" cols="auto"
                  ><VBtn color="error" fab small @click="deletePdf"
                    ><VIcon dense>mdi-close</VIcon></VBtn
                  ></VCol
                >
              </VRow>
            </VRow>
          </VCardTitle>
          <VCardSubtitle>PDF-файл</VCardSubtitle>
          <VCardText> </VCardText>
          <VRow no-gutters justify="center">
            <VCol cols="8">
              <VuePdfApp
                v-show="pdf"
                style="height: 80vh"
                page-scale="40"
                theme="light"
                :pdf="pdf"
                file-name="name"
              />
            </VCol>
          </VRow>
        </div>
      </VCard>
    </div>
    <VRow justify="end">
      <v-speed-dial v-model="fab" transition="slide-y-reverse-transition">
        <template v-slot:activator>
          <v-btn v-model="fab" color="blue darken-2" dark fab small>
            <v-icon v-if="fab"> mdi-close </v-icon>
            <v-icon v-else> mdi-plus </v-icon>
          </v-btn>
        </template>
        <v-btn fab dark small color="green" @click="pdfVisible = true">
          <v-icon>mdi-file-pdf-box</v-icon>
        </v-btn>
        <v-btn fab dark small color="indigo">
          <v-icon>mdi-calendar-text</v-icon>
        </v-btn>
      </v-speed-dial>
    </VRow>

    <AddNewPageDialog
      v-if="editFolderVisivle"
      :visible="editFolderVisivle"
      @close="editFolderVisivle = false"
      :isEditFolder="isEditFolder"
      :editFolder="page.folder"
      @update="changedFolder"
    />
    <AddNewPdfDIalog
      v-if="pdfVisible"
      :visible="pdfVisible"
      @close="pdfVisible = false"
      @onAddPDF="onAddPDF"
    />
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import AddNewPageDialog from "../Layout/AddNewPageDialog";
import AddNewPdfDIalog from "./AddNewPdfDIalog";
import pageService from "@/request/page/pageService";
import loader from "@/mixins/loader";
import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";

export default {
  mixins: [loader],
  components: {
    VueEditor,
    AddNewPageDialog,
    AddNewPdfDIalog,
    VuePdfApp,
  },
  data: () => ({
    page: [],
    oldPage: [],
    cancelDisabled: false,
    fab: "",
    pageId: "",
    changeFolderVisible: false,
    isEditFolder: false,
    editFolderVisivle: false,
    folderName: "",
    pdf: "",
    title: "",
    idPdf: 0,
    pdfVisible: false,
    numPages: undefined,
  }),
  watch: {
    $route: {
      deep: true,
      handler(e) {
        this.getPage();
        this.pdf = "";
        if (this.page.files) {
          checkPdf(0);
        }
      },
    },
    page: {
      deep: true,
      handler(newPage) {
        if (
          newPage.html != this.oldPage.html ||
          newPage.files != this.oldPage.files
        ) {
          this.cancelDisabled = true;
        } else {
          this.cancelDisabled = false;
        }
      },
    },
  },

  mounted() {
    this.getPage();
  },
  methods: {
    checkPdf(e) {
      //console.log(e)
      if (typeof e !== "undefined") {
        this.title = this.page.files[e].title;
        this.pdf = this.page.files[e].file;
        this.idPdf = this.page.files[e].id;
      }
    },
    async onAddPDF(params) {
      try {
        this.setLoading(true);
        const res = await pageService.update(this.$route.params.id, {
          files: params,
        });
        console.log(res.info);
        this.page.files.push(params);
        this.setLoading(false);
      } catch (e) {
        alert(e);
      }
    },
    async deletePdf() {
      try {
        const params = [];
        params.idPdf = this.idPdf;
		console.log(params)
        await pageService.deletePdf(this.$route.params.id, {...params}).then(()=>{
			this.page.files = this.page.files.filter((item) => item.id !== this.idPdf);
			if (this.page.files.length < 1) {
				this.pdf = ""
			}
		});
      } catch (e) {
        alert(e);
      }
    },
    async deletePage() {
      try {
        this.setLoading(true);
        await pageService.delete(this.$route.params.id);
        this.$router.push({ name: "admin-permission-guard" });
        this.setLoading(false);
      } catch (e) {
        alert(e);
      }
    },
    async getPage() {
      this.setLoading(true);
      const newPage = await pageService.getOne({ _id: this.$route.params.id });
      this.page = newPage[0];
      this.oldPage = { ...newPage[0] };
      this.cancelDisabled = false;
      for (let i = 0; i < this.page.files.length; i++) {
        this.page.files[i]["active"] = false;
      }
      console.log(this.page);
      if (!this.page) {
        this.$router.push({ name: "admin-permission-guard" });
      } else {
        this.folderName = this.page.folder.name;
      }
      this.setLoading(false);
    },
    async onCreate() {
      const params = [];
      params.html = this.page.html;
      try {
        await pageService.update(this.$route.params.id, { ...params });
      } catch (e) {
        alert(e);
      }
    },
    onCancel() {
      this.page = { ...this.oldPage };
    },
    onChangeFolder() {
      this.isEditFolder = true;
      this.editFolderVisivle = true;
    },
    changedFolder() {
      this.getPage();
      this.editFolderVisivle = false;
    },
  },
};
</script>
<style lang="scss">
.pdf-app .toolbar {
  z-index: 100 !important;
}
</style>
