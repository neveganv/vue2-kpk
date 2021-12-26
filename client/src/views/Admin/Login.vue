<template>
  <div class="d-flex justify-center align-center w-100 h-100">
    <v-card max-width="400" class="w-100">
      <v-card-title>Авторизація  рази </v-card-title>
      <v-card-subtitle>2 рази клікни по кнопці (я це пофікшу)</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              dense
              outlined
              hide-details
              v-model="email"
              label="Email"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              dense
              outlined
              hide-details
              :type="passwordVisible ? 'text' : 'password'"
              :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="passwordVisible = !passwordVisible"
              v-model="password"
              label="Пароль"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
         <v-btn :to="{path:'/'}" text color="secondary"><VIcon left>mdi-arrow-left</VIcon>
         назад
         </v-btn>
        <v-spacer></v-spacer>
        <v-col>
          <v-btn @click="login" color="primary">Авторизуватися</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import usersService from '@/request/users/usersService';
import * as actionTypes from '@/store/modules/auth/types/actions';
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    password: null,
    email: null,
    passwordVisible:false
  }),
  methods: {
    ...mapActions('auth', {
			logIn: actionTypes.FETCH_USER,
      fetchUser: actionTypes.FETCH_USER,

		}),
    async login() {
      try {
        const params = [];
        params.email = this.email;
        params.password = this.password
        
        let token = await usersService.login({ ...params });
        localStorage.token = JSON.stringify(token)
        this.logIn(token)
        this.$router.push({name : "admin-permission-guard"});
      } catch (e) {
        alert(e);
      }
    },
  },
};
</script>

<style></style>
