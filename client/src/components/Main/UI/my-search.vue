<template>
<div>
  <div v-if="loading">
    <VRow
      align="center"
      justify="center"
      style="height: 30vh"
      class="bg-white"
    >
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </VRow>
	</div>
	<div v-else>
    <VCol
    >
      <h3 v-if="filter.news.length > 0 || filter.news1.length > 0">Новини</h3>
      <VCol v-for="news in filter.news" :key="news._id">
        <VCard
        @click="
            $router.push({
              name: 'main-news-page',
              params: { id: news._id },
            })
          ">
          <VCardTitle>{{ news.title }}</VCardTitle>
          <VCardText></VCardText>
        </VCard>
      </VCol>
      <VCol v-for="news in filter.news1" :key="news._id">
        <VCard 
        @click="
            $router.push({
              name: 'main-news-page',
              params: { id: news._id },
            })
          ">
          <VCardTitle>{{ news.title }}</VCardTitle>
          <VCardText></VCardText>
        </VCard>
      </VCol>
      <h3 v-if="filter.specialty.length > 0">Спеціальності</h3>
      <VCol v-for="spec in filter.specialty" :key="spec._id">
        <VCard
          @click="
            $router.push({
              name: 'main-speciality-page',
              params: { id: spec._id },
            })
          "
        >
          <VCardTitle>{{ spec.name }}</VCardTitle>
          <VCardText>{{ spec.content }}</VCardText>
        </VCard>
      </VCol>
      <h3 v-if="filter.page.length > 0">Сторінки</h3>
      <VCol v-for="page in filter.page" :key="page._id">
        <VCard
          @click="
            $router.push({
              name: 'main-dynamic-page',
              params: { id: page._id },
            })
          "
        >
          <VCardTitle>{{ page.name }}</VCardTitle>
          <VCardText></VCardText>
        </VCard>
      </VCol>
    </VCol>
    <VCol v-if="!filter.news.length && !filter.news1.length && !filter.page.length && !filter.specialty.length">
      <h2>Нічого не знайдено</h2>
      <span
        >Вибачте, але нічого не знайшлося. Спробуйте змінити пошуковий
        запит</span
      >
    </VCol>
  </div>
  </div>
</template>

<script>
import newsService from "@/request/news/newsService.js";
import pageService from "@/request/page/pageService.js";
import specialtyService from "@/request/specialty/specialtyService.js";
export default {
  data: () => ({
    filter: {
      news: [],
      news1: [],
      page: [],
      specialty: [],
    }, 
	loading: true,
  }),
  mounted() {
    this.searchAll();
  },
  methods: {
    async searchAll() {
      const params = [];
      params.title = this.$route.params.query;
      let response = await newsService.searchCoolNews({ ...params });
      this.filter.news = response;
      response = await newsService.searchSimpleNews({ ...params });
      this.filter.news1 = response;
      response = await pageService.searchPage({ ...params });
      this.filter.page = response;
      response = await specialtyService.searchSpecialty({ ...params });
      this.filter.specialty = response;
	  this.loading = false
    },
  },
  watch: {
    $route: {
      deep: true,
      handler() {
		  this.loading = true
        this.searchAll();
      },
    },
  },
};
</script>

<style></style>
