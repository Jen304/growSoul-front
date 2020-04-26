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
// import icon
import {
  mdiEmoticonKiss,
  mdiEmoticonWink,
  mdiEmoticonCry,
  mdiEmoticonAngry,
  mdiEmoticonSad,
  mdiEmoticonDead
} from "@mdi/js";
const emotions = [
  { value: "happy", icon: mdiEmoticonKiss },
  { value: "surprising", icon: mdiEmoticonWink },
  { value: "sad", icon: mdiEmoticonSad },
  { value: "fear", icon: mdiEmoticonCry },
  { value: "anger", icon: mdiEmoticonAngry },
  { value: "disgust", icon: mdiEmoticonDead }
];
const levels = [
  { value: "Very high", icon: null },
  { value: "High", icon: null },
  { value: "Neural", icon: null },
  { value: "low", icon: null },
  { value: "Not a lot", icon: null }
];
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
        options: emotions,
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
        options: getLevels(emotion.icon),
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
      const time = Date.now();
      const newEmotion = {
        value: emotion,
        level: level.value.toLowerCase(),
        icon: level.icon,
        time
      };
      return newEmotion;
    }
  }
};
</script>

