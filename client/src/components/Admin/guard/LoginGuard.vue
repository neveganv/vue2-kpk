<template>
  <RouterView />
</template>

<script>
// eslint-disable-next-line import/no-cycle
import store from '@/store';

export default {
  name: 'LoginGuard',
  beforeRouteEnter(to, from, next) {
    if (store.state.auth.user && localStorage.token) {
      next();
    } else {
      next({ name: 'admin-login' });
    }
  },
};
</script>

<style scoped>

</style>
