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
  { value: "Very high" },
  { value: "High" },
  { value: "Neural" },
  { value: "low" },
  { value: "Not a lot" }
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
      const emotion = this.emotion;
      const newEmotion = { value: emotion, level };
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

