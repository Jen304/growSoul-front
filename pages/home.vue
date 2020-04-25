<template>
  <v-container fluid fill-height>
    <emotion-form :questionPackage="questionPackage" @customMethod="questionPackage.method"></emotion-form>
  </v-container>
</template>

<script>
import EmotionForm from "../components/EmotionForm";
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
  { text: "Very high", value: 5 },
  { text: "High", value: 4 },
  { text: "Neural", value: 3 },
  { text: "low", value: 2 },
  { text: "Not a lot", value: 1 }
];
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
  components: {
    "emotion-form": EmotionForm
  },
  methods: {
    // method for the first package, change the question package
    nextQuestionPackage(value) {
      this.emotion = value;

      this.questionPackage = {
        question: "What is the level of this feeling?",
        options: levels,
        method: this.submit
      };
    },
    // method for the second package
    // change the question package and hide the form
    submit(level) {
      const emotion = this.emotion.toLowerCase();
      const time = Date.now();
      const newEmotion = { value: emotion, level, time };

      this.$store.commit("emotion/add", newEmotion);
      //console.log(newEmotion);
      this.questionPackage = {
        hide: true,
        method() {
          return;
        }
      };
    }
  }
};
</script>

