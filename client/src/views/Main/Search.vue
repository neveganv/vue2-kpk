<template>
<v-main>
    <v-container>
        <Header @searchQuery="searchQuery"/>
        <MySearch :search="data"/>
   </v-container>
</v-main>
</template>

<script>
import Header from "@/components/Main/UI/my-header.vue";
import MySearch from "@/components/Main/UI/my-search.vue";
export default {
    components:{
        Header,
        MySearch
    },
    data: () => ({
        data: ""
    }),
    methods:{
        searchQuery(e){
            console.log(e)

        }
    }
}
</script>

<style>

</style>