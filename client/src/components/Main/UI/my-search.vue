<template>
<VCol>
    {{Search}}
    <VCol v-for="news in news" :key="news._id">
        <VCard>
            <VCardTitle>{{news.title}}</VCardTitle>
        </VCard>
    </VCol>
    <VCol v-for="news in news1" :key="news._id">
        <VCard>
            <VCardTitle>{{news.title}}</VCardTitle>
        </VCard>
    </VCol>
    <VCol v-for="page in page" :key="page._id">
        <VCard>
            <VCardTitle>{{page.name}}</VCardTitle>
        </VCard>
    </VCol>
    <VCol v-for="spec in specialty" :key="spec._id">
        <VCard>
            <VCardTitle>{{spec.name}}</VCardTitle>
        </VCard>
    </VCol>
</VCol>
</template>

<script>
import newsService from "@/request/news/newsService.js";
import pageService from "@/request/page/pageService.js";
import specialtyService from "@/request/specialty/specialtyService.js";
export default {
    data:() => ({
        news: [],
        news1: [],
        page: [],
        specialty: []
    }),
    props: {
        search:{
            require: true
        }
    },
    mounted(){
        this.searchAll();
        this.getData();
        console.log(this.Search)
    },
    methods: {
       async searchAll(){
           const params = []
           params.title = "123"
          let response = await newsService.searchCoolNews({...params})
          this.news = response;
        },
        async getData(){
            let response = await newsService.getCoolNews();
            this.news1 = response 
            response = await specialtyService.getAllSpecialty(); 
            this.specialty = response
            response = await pageService.getPages();
            this.page = response
        }
    },
    computed:{
        Search:{
            get(){
                return this.search
            }
        }
    }
}
</script>

<style>

</style>