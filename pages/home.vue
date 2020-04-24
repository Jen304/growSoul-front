<template>
  <v-container fluid fill-height>
    <!-- first question -->

    <emotion-form :questionPackage="questionPackage"></emotion-form>
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
      // first question package for emotion form
      questionPackage: {
        question: "How are you now?",
        options: emotions
      }
    };
  },
  components: {
    "emotion-form": EmotionForm
  },
  methods: {}
};
</script>

