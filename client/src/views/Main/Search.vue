<template>
<v-main>
    <v-container>
        <Header/>
        <MySearch/>
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
}
</script>

<style>

</style>