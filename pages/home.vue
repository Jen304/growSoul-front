<template>
  <v-container fluid fill-height>
    <emotion-form v-if="!hideForm" @hide-form="hideForm = true" :value="sampleEmotion"></emotion-form>
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
      hideForm: false,
      sampleEmotion: {
        emotion: "5",
        story: "today is a good day",
        created_at: new Date()
      }
    };
  },
  // register components for home page
  components: {
    "emotion-form": EmotionForm,
    "emotion-history": EmotionHistory
  }
};
</script>

