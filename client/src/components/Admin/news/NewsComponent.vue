<template>
  <div>
    <h3>Новини</h3>
    <div>
      <NewsCard/>
    </div> 
<div>
  <v-btn 
  elevation="6"
  @click="$router.push('/news/add-new')">Додати новину</v-btn>
</div>
  </div>
</template>

<script>
import NewsCard from './NewsCard';
import AddNews from './AddNews';
import axios from 'axios';
export default {
  components: {
		NewsCard,
    AddNews
	},
  data:() => {
    return{
      title:"",
      content:""
      }
  },
}
</script>

<style>

</style>