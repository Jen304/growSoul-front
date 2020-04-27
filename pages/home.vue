<template>
  <v-container fluid fill-height>
    <emotion-form v-if="!hideForm" @hide-form="hideForm = true"></emotion-form>
    <emotion-history v-if="hideForm"></emotion-history>
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
  },
  methods: {
    getNewEmotion(emotion) {
      const created_at = Date.now();
      const newEmotion = {
        emotion,
        created_at
      };
      return newEmotion;
    }
  }
};
</script>

