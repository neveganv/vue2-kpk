<template>
  <div class="pa-15">
    <v-row>
      <v-col
        class="col-md-3 col-sm-6"
        v-for="partner in partners"
        :key="partner._id"
      >
        <v-card :href="partner.path_link">
          <v-img height="140" cover :src="partner.path_img" />
          <v-card-title v-if="partner.partner_name" class="pa-2">{{ partner.partner_name}} </v-card-title>
           <v-card-title v-else class="pa-6"></v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    partners: {
      type: Array,
      require: false,
    },
  },
};
</script>