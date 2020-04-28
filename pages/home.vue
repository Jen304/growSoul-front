<template>
  <v-container fluid full-height>
    <v-layout justify-center class="emotion-card" v-if="!hideForm" ma-5>
      <v-flex xs11 sm6 md3>
        <emotion-form @hide-form="hideForm = true"></emotion-form>
      </v-flex>
    </v-layout>
    <emotion-history></emotion-history>
  </v-container>
</template>

<script>
// import components
import EmotionForm from "../components/EmotionForm";
import EmotionHistory from "../components/EmotionHistory";

export default {
  // set up the title of the page to layout
  beforeCreate() {
    this.$store.commit("page/title", "Home");
  },
  data() {
    return {
      hideForm: false
    };
  },
  // register components for home page
  components: {
    "emotion-form": EmotionForm,
    "emotion-history": EmotionHistory
  }
};
</script>
<style scoped>
@media only screen and (max-width: 600px) {
  .emotion-card {
    width: 90%;
  }
}
</style>

