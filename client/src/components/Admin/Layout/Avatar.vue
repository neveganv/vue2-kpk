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
        const Innitial = Array.prototype.map.call(this.name.split(" "), function(x){ return x.substring(0,1).toUpperCase();}).join('');

        return Innitial
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
