<template>
    <v-card 
    class="mx-auto"
    max-width="500">
    <v-list-navigation-drawer permante>
    <!-- Avatar and username -->
       <v-list> 
        <v-list-item>
            <v-list-item-avatar>
                <img :src="require('@/assets/img/Avatar.svg')"/>
            </v-list-item-avatar>
        </v-list-item>
    <v-subheader>Ім'я користувача</v-subheader>
    <v-list-item-group
        v-model="selectItem"
        color="primary">
            <v-list-item 
            v-for="(opt, kOpt) in options"
            :key= "kOpt">
                <v-list-item-content> 
                    <v-list-item-title v-text="opt.title"/>
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
      <!-- Specialties list -->  
      <v-list-group
          :value="true"
          no-action
          sub-group
          v-text="Спеціальності">  
        <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Спеціальності</v-list-item-title>
            </v-list-item-content>
          </template>
           <v-list-item-group
        v-model="selectItem"
        color="primary">
            <v-list-item 
            v-for="(spec, kS) in specialties"
            :key= "kS">
                <v-list-item-content> 
                    <v-list-item-title v-text="spec.title"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </v-list-item-group>
        </v-list-group>
        <!-- /Specialties list -->
        <!-- Department -->
        <v-list-group 
        :value="true"
          no-action
          sub-group
        >
        <template v-slot:activator>
        <v-list-item-content>
              <v-list-item-title>Віділення</v-list-item-title>
            </v-list-item-content>
            </template>
         <v-list-item-group
        v-model="selectItem"
        color="primary">
            <v-list-item 
            v-for="(dep, kD) in department"
            :key= "kD">
                <v-list-item-content> 
                    <v-list-item-title v-text="dep.title"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </v-list-item-group>
            </v-list-group>
            <!-- Departament -->
            <!-- Student -->
            <v-list-group 
        :value="true"
          no-action
          sub-group
        >
        <template v-slot:activator>
        <v-list-item-content>
              <v-list-item-title >Студенту</v-list-item-title>
            </v-list-item-content>
            </template>
        <v-list-item-group
        v-model="selectItem"
        color="primary">
            <v-list-item 
            v-for="(stud, kS) in student"
            :key= "kS">
                <v-list-item-content> 
                    <v-list-item-title v-text="stud.title"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
            </v-list-group>
            <!-- /Student -->
        </v-list>
      </v-list-navigation-drawer>
    </v-card>
</template>

<script>
export default {
    data: () => {
        return{
            selectItem: false,
        options: [
            {title:"Головна"},
            {title:"Новини"},
            {title:"Додати"}],
        news:[{
            title:"Куда поступити",
            text:"Віолфрвліорвліфрволірфлврфіовріфловрфілов",
            author:"Іван"
        },{
            title:"Куда поступити1",
            text:"Віолфрвліорвліфрволірфлврфіовріфловрфілов",
            author:"Іван"
        },{
            title:"Куда поступити2",
            text:"Віолфрвліорвліфрволірфлврфіовріфловрфілов",
            author:"Іван"
        }],
        specialties:[
        {title:"Інженерія програмного забезпечення"},
        {title:"Інженерія програмного забезпечення1"},
        {title:"Інженерія програмного забезпечення1"}],
        department:[
            {title:"Інженерія програмного забезпечення"},
            {title:"Інженерія програмного забезпечення"},
            {title:"Інженерія програмного забезпечення"}],
        student:[
            {title:"Інженерія програмного забезпечення"},
            {title:"Інженерія програмного забезпечення"},
            {title:"Інженерія програмного забезпечення"}]
    }
}
};
</script>
<style>
</style>
