<template>
    <v-row justify="center">
            <VCard>
                <VCardTitle>Додати новий розділ</VCardTitle>
                  <VContent>
                     <VTextField 
                      label="Назва"
                      v-model="title"
                       />
                     <VBtn
                        elevation="6"
                      @click="addOptions">Зберегти</VBtn>
                  </VContent>
            </VCard>
    </v-row>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            title:"",
        }
    },
    methods:{
       addOptions(){
           axios.post('/api/optionsList/', {
			  title: this.title
			  }
		  );
	   }
	},
};
</script>

<style></style>
