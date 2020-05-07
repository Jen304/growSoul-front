<template>
  <v-app>
    <h1>Welcome to grow your soul</h1>
    <logout-button></logout-button>
  </v-app>
</template>
<script>
import { mapActions } from "vuex";
import moment from "moment";
import LogoutButtonVue from "../components/LogoutButton.vue";
export default {
  components: {
    "logout-button": LogoutButtonVue
  },
  data() {
    return {
      emotions: [],
      posts: []
    };
  },
  layout: "plain",
  mounted() {
    //console.log(moment().format());
    //this.$store.dispatch("emotion/getEmotionList");
  },
  methods: {
    //...mapActions(["emotion/getEmotionList"])
  }
};
</script>