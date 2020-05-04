<template>
  <v-app>
    <h1>Welcome to grow your soul</h1>
  </v-app>
</template>
<script>
import { mapActions } from "vuex";
import moment from "moment";
export default {
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