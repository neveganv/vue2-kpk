<template>
  <div>
      <v-avatar color="primary"   :size="size">
      <span class="white--text text-h6">{{firstLetter}}</span>
    </v-avatar>
  </div>
</template>

<script>

export default {
  name: 'Avatar',
  props: {
    size: {
      required: false,
      default: 32,
    },
    name: {
      required: true,
    },
  },
  computed: {
    firstLetter() {
        console.log(this.name?.charAt(0)?.toUpperCase())
      return this.name?.charAt(0)?.toUpperCase();
    },
  },
};
</script>

<style scoped lang="scss">
.avatar-circle {
  font-weight: bold;
  background: var(--v-green-base);
  color: #fff;
  border-radius: 50%;
  user-select: none;
  text-transform: uppercase;
}
</style>
