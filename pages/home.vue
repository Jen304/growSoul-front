<template>
  <v-container fluid fill-height>
    <emotion-form v-if="!hideForm"></emotion-form>
  </v-container>
</template>

<script>
// import components
import EmotionForm from "../components/EmotionForm";
import EmotionSummary from "../components/EmotionSummary";
import StoryForm from "../components/StoryForm";
import StoriesSummary from "../components/StoriesSummary";

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
    "emotion-summary": EmotionSummary,
    "story-form": StoryForm,
    "stories-summay": StoriesSummary
  },
  methods: {
    hideForm(hide) {},
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

