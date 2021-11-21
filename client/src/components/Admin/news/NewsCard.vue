<template>
<div>
<VCard 
   v-for="news in news"
   :key="news._id"
   max-width="300"
   class="mx-auto my-12" 
    >
      <VCardTitle v-text="news.title"/>
      <VCardText v-text="news.content"/>
</VCard>
</div>
</template>

<script>
import axios from 'axios';
export default {
  data:() => {
    return{
        news:[]
    }
},
mounted() {
    this.getAllNews();
    console.log(this.news);
},
computed:{
    getAllNews(){
        axios.post('api/news/getAll',{})
        .then((response) => {
            this.news = response.data;
          })
          .catch(function (error) {
            if (error.response) {
              alert(error.toString());
            }
          });
    }
}
}
</script>

<style>

</style>