<template>
  <v-navigation-drawer
    fixed
    right
    v-model="navVisible"
    class="overflow-hidden"
    mobile-breakpoint="1626"
  >
    <div class="navigation">
      <v-sheet>
        <v-container style="height: auto">
          <!-- <VCardTitle> Навігація </VCardTitle> -->
          <div v-if="$vuetify.breakpoint.mdAndDown">
            <div>
              <VMenu
                offset-y
                transition="slide-y-transition"
                rounded="lg"
                :close-on-content-click="false"
                v-model="activationEvents"
              >
                <template v-slot:activator="{ on, attrs }">
                  <VSubheader
                    v-on="on"
                    v-bind="attrs"
                    class="d-flex align-center"
                  >
                    <VRow>
                      Абітурієнту
                      <VIcon>{{
                        activationEvents === true
                          ? "mdi-menu-up"
                          : "mdi-menu-down"
                      }}</VIcon>
                    </VRow>
                  </VSubheader>
                </template>
                <VSheet :min-width="170" :max-width="300">
                  <v-list dense>
                    <v-list-item-group color="purple">
                      <div v-for="(item, i) in entrantPage" :key="i">
                        <VDivider v-if="i > 0" class="mx-5" />
                        <v-list-item :to="{ name: item.link }">
                          <v-list-item-content>
                            <VRow
                              no-gutters
                              align="center"
                              justify="space-around"
                            >
                              <VCol cols="3">
                                <v-icon v-text="item.icon" dense></v-icon>
                              </VCol>
                              <VCol cols="9" v-text="item.text"></VCol>
                            </VRow>
                          </v-list-item-content>
                        </v-list-item>
                      </div>
                    </v-list-item-group>
                  </v-list>
                </VSheet>
              </VMenu>
              <VDivider />
            </div>
            <div>
              <VMenu
                offset-y
                transition="slide-y-transition"
                rounded="lg"
                :close-on-content-click="false"
                v-model="activationEventsEntrance"
              >
                <template v-slot:activator="{ on, attrs }">
                  <VSubheader
                    v-on="on"
                    v-bind="attrs"
                    class="d-flex align-center"
                  >
                    <VRow>
                      Студентові
                      <VIcon>{{
                        activationEventsEntrance === true
                          ? "mdi-menu-up"
                          : "mdi-menu-down"
                      }}</VIcon>
                    </VRow>
                  </VSubheader>
                </template>
                <VSheet :min-width="170" :max-width="300">
                  <v-list dense>
                    <v-list-item-group color="purple">
                      <div v-for="(item, i) in studentsPage" :key="i">
                        <VDivider v-if="i > 0" class="mx-5" />
                        <v-list-item :to="{ name: item.link }">
                          <v-list-item-content>
                            <VRow
                              no-gutters
                              align="center"
                              justify="space-around"
                            >
                              <VCol cols="3">
                                <v-icon v-text="item.icon" dense></v-icon>
                              </VCol>
                              <VCol cols="9" v-text="item.text"></VCol>
                            </VRow>
                          </v-list-item-content>
                        </v-list-item>
                      </div>
                    </v-list-item-group>
                  </v-list>
                </VSheet>
              </VMenu>
              <VDivider />
            </div>
          </div>
          <VSubheader>Партнери</VSubheader>
          <div class="sponsor__wrapper">
            <div
              class="sponsor__inner"
              v-for="sponsor in sponsors"
              :key="sponsor._id"
              @click="onClickSponsor(sponsor.path_link)"
            >
              <img height="60" cover :src="sponsor.path_img" alt="" draggable="false" />
            </div>
          </div>
        </v-container>
      </v-sheet>
    </div>
  </v-navigation-drawer>
</template>

<script>
import partnersService from "@/request/partners/partnersService";
import loader from "@/mixins/loader";
export default {
  mixins: [loader],
  methods: {
    onBurger() {
      this.$emit("onBurgerNav");
    },
    onClickSponsor(link) {
      window.open(link, "_blank");
    },
    async getPartners() {
      try {
        this.setLoading(true);
        this.sponsors = await partnersService.getAll();
        this.setLoading(false);
      } catch (e) {
        alert(e);
      }
    },
  },
  watch: {
    navigationRight: {
      deep: true,
      handler(e) {
        this.navVisible = e;
      },
    },
    navVisible(e) {
      if (!e) {
        this.$emit("closeNavigation");
      }
    },
  },
  mounted() {
    console.log(this.navigationRight);
    this.getPartners();
  },
  data: () => ({
    activationEvents: false,
    activationEventsEntrance: false,
    navVisible: "",
    sponsors: [],
    studentsPage: [
      { text: "Розклад", icon: "mdi-calendar", link: "main-student-shedule" },
    ],
    entrantPage: [
      {
        text: "Підготовчі курси",
        icon: "mdi-school",
        link: "main-entrant-prepare",
      },
    ],
  }),

  props: {
    navigationRight: {
      require: true,
    },
  },
};
</script>

<style lang="scss">
.navigation {
  &::-webkit-scrollbar {
    width: 8px !important;
    height: 12px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(113, 113, 113, 0.3);
    border: thin solid rgb(245, 245, 244);
    border-radius: 9em;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: darken(rgba(113, 113, 113, 0.5), 4);
  }
}
.sponsor__wrapper {
  width: 100%;
  padding-left: 20px;
  .sponsor__inner {
    margin-bottom: 20px;
    max-width: 170px;
    height: 50px;
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    padding: 4px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    &:hover {
      opacity: 0.9;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(#0000, 0.03);
        border-radius: 5px;
        z-index: 100;
      }
    }
  }
}
</style>
