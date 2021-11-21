<template>
  <div>
    <div>
  <VCard max-width="800">
    <VCardTitle>Додати новину</VCardTitle>
    <VContent>
    <VTextField 
    label="Назва"
    v-model="title"
    />
    <VTextField 
    label="Контент"
    v-model="title"
    />
    <VBtn
     elevation="6"
     @click="addNewNews">Зберегти</VBtn>
     </VCOntent>
  </VCard>
   </div>
  </div>
</template>

<script>
import NewsCard from './NewsCard'
import axios from 'axios';
export default {
  components: {
		NewsCard,
	},
  data:() => {
    return{
      title:"",
      content:""
      }
  },
  methods:{
    addNewNews(){
      console.log("title", this.title, "content", this.content);
       axios.post("/api/news",{
         title: this.title,
         content: this.content
       });
    }
  }

}
</script>

<style>

</style>