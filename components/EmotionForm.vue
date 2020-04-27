<template>
  <v-layout justify-center class="emotion-card">
    <v-flex xs12 sm8 md6>
      <v-card class="elevation-5">
        <v-card-title>{{ question }}</v-card-title>
        <v-card-subtitle v-if="error">Please choose your emotion</v-card-subtitle>
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
    },
    newEmotion() {
      return {
        emotion: this.emotion,
        created_at: new Date(),
        story: this.story
      };
    }
  },
  methods: {
    onEmotionClick(emotion) {
      this.emotion = emotion;
      console.log(this.emotion);
    },
    onSubmit() {
      const emotion = this.emotion;
      // check the emtion value
      if (emotion == null) {
        console.log("error");
        this.error = true;
      } else {
        this.$store.commit("emotion/add", this.newEmotion);
        //console.log(this.$store.state.emotion.list);
        this.$emit("hide-form");
      }
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