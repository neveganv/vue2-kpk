<template>
  <div class="d-flex justify-center align-center w-100 h-100">
    <v-card max-width="600" class="w-25">
      <v-card-title>Авторизація</v-card-title>
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
              v-model="password"
              label="Пароль"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
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

export default {
  data: () => ({
    password: null,
    email: null,
  }),
  methods: {
    async login() {
      try {
        const params = [];
        params.email = this.email;
		params.password = this.password
		
        let token = await usersService.login({ ...params });
		localStorage.token = JSON.stringify(token)
		this.$router.push('/admin')
      } catch (e) {
        alert(e);
      }
    },
  },
};
</script>

<style></style>
