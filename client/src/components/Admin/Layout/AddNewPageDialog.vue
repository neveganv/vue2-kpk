<template>
  <VDialog v-model="visibility">
    <VCard width="500">
      <VCardTitle v-if="!addPageVisibility"> Додати нову папку </VCardTitle>
      <VCardTitle v-else> Додати нову сторінку </VCardTitle>
      <VCardText>
        <VRow>
          <VCol>
            <VTextField
              :label="addPageVisibility ? 'Назва сторінки' : 'Назва папки'"
              prepend-icon="mdi-application-edit"
              outlined
              dense
              hide-details
              v-model="page.name"
            >
            </VTextField>
          </VCol>
        </VRow>
        <VRow>
          <!-- <VCol>
						<VTextField
							label="Тип Сторінки (тут напевно чот над зробить вибірку якусь)"
							prepend-icon="mdi-application-cog"
							outlined
							dense
							hide-details
							v-model="page.type"
						>
						</VTextField>
					</VCol> -->
        </VRow>
        <VRow>
          <VCol>
            <v-select
              v-model="page.permissions"
              :items="Object.values(categories)"
              attach
              :item-value="'_id'"
              :item-text="'title'"
              prepend-icon="mdi-shield-account"
              outlined
              dense
              label="Права доступу"
              multiple
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
        <VBtn color="primary" @click="onCreateFolder" v-if="!addPageVisibility">
          Додати Папку
        </VBtn>
        <VBtn color="primary" @click="onCreatePage" v-else>
          Додати Сторінку
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script>
// import pageService from "@/request/page/pageService";
import folderService from "@/request/folders/folderService";
import positionService from '@/request/positions/positionService';

export default {
  data: () => ({
    page: [],
    categories: [],
  }),
  props: {
    visible: {
      require: true,
    },
    addPageVisibility: {
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
  },
  mounted(){
	  this.getPositions()
  },
  methods: {
    async onCreateFolder() {
      const params = [];
      params.name = this.page.name, 
      params.positions = this.page.permissions
	  try {
      await folderService.addFolder({
      	...params
      }).then((res) => {
		  this.$emit('addedFolder', res)
		  this.$emit("close");
	  });
	  }
	  catch(e){
		  alert(e)
	  }
    },
    async getPositions() {
      try {
        this.categories = await positionService.getAll();
      } catch (e) {
        alert(e);
      }
    },
    async onCreatePage() {},
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
  },
};
</script>

<style></style>
