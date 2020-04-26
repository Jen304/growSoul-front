<template>
  <v-container fluid fill-height>
    <emotion-form :questionPackage="questionPackage" @customMethod="questionPackage.method"></emotion-form>
    <emotion-summary></emotion-summary>
    <story-form></story-form>
    <stories-summay></stories-summay>
  </v-container>
</template>

<script>
// import components
import EmotionForm from "../components/EmotionForm";
import EmotionSummary from "../components/EmotionSummary";
import StoryForm from "../components/StoryForm";
import StoriesSummary from "../components/StoriesSummary";

// helper function to add icon according to emotion
const getLevels = function(emotionIcon) {
  for (let element of levels) {
    element.icon = emotionIcon;
  }
  return levels;
};

export default {
  // set up the title of the page to layout
  beforeCreate() {
    this.$store.commit("page/title", "Home");
  },
  data() {
    return {
      // user emotion init
      emotion: null,
      // first question package for emotion form
      questionPackage: {
        question: "How are you now?",
        options: this.$store.getters["emotion/emotionListWithIcon"],
        method: this.nextQuestionPackage
      }
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
    // method for the first package, change the question package
    nextQuestionPackage(emotion) {
      this.emotion = emotion.value.toLowerCase();
      this.questionPackage = {
        question: "What is the level of this feeling?",
        options: this.$store.getters["emotion/levelListWithIcon"](this.emotion),
        method: this.submit
      };
    },
    // method for the second package
    // change the question package and hide the form
    submit(level) {
      // add new emotion to the vuex store
      this.$store.commit("emotion/add", this.getNewEmotion(level));
      //console.log(newEmotion);
      // hide emotion card
      this.questionPackage = {
        hide: true,
        method() {
          return;
        }
      };
    },
    getNewEmotion(level) {
      const emotion = this.emotion.toLowerCase();
      const created_at = Date.now();
      const newEmotion = {
        type: emotion,
        level: level.value.toLowerCase(),
        created_at
      };
      return newEmotion;
    }
  }
};
</script>

