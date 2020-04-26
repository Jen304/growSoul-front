<template>
  <v-layout justify-center class="emotion-card">
    <v-flex xs12 sm5 md4>
      <v-card class="elevation-5">
        <v-card-title>{{ question }}</v-card-title>
        <v-card-subtitle></v-card-subtitle>
        <v-container>
          <v-layout justify-space-around>
            <v-icon
              v-for="(emotion, i) in emotionList"
              :key="i"
              x-large
              @click="onEmotionClick(emotion.value)"
            >{{ emotion.icon}}</v-icon>
          </v-layout>
        </v-container>

        <v-card-text>
          <v-text-field label="Write something about it" counter outlined v-model="story"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="onSubmit">Save</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: "emotion-form",
  data() {
    return {
      question: "How are you now?",
      emotion: null,
      story: null,
      // show error message if use does not chose emotion
      error: false
    };
  },
  computed: {
    // return emotion list with icon from store
    emotionList() {
      return this.$store.getters["emotion/emotionListWithIcon"];
    }
  },
  methods: {
    onEmotionClick(emotion) {
      this.emotion = emotion;
      console.log(this.emotion);
    },
    onSubmit() {
      console.log(this.story);
    }
  }
};
</script>
<style scoped>
.option {
  text-transform: capitalize;
}
@media only screen and (max-width: 600px) {
  .emotion-card {
    width: 90%;
  }
}
</style>