<template>
  <v-card class="elevation-5">
    <v-card-title>{{ question }}</v-card-title>
    <v-card-subtitle class="red--text" v-if="error">Please choose your emotion</v-card-subtitle>
    <v-container>
      <v-layout justify-space-around>
        <v-icon
          v-for="(emotion, i) in emotionList"
          :key="i"
          :size="getSize(emotion)"
          @click="onEmotionClick(emotion)"
          :color="getEmotionColor(emotion)"
        >{{ getEmotionIcon(emotion)}}</v-icon>
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
</template>
<script>
export default {
  name: "emotion-form",

  data() {
    return {
      question: "How are you now?",
      emotion: null,
      story: null,
      created_at: null,
      // show error message if use does not chose emotion
      error: false
    };
  },
  computed: {
    // return emotion list with icon from store
    emotionList() {
      return this.$store.getters["emotion/emotionList"];
    },
    newEmotion() {
      return {
        emotion: this.emotion,
        created_at: this.created_at || new Date(),
        story: this.story
      };
    }
  },
  methods: {
    // assign chosen emotion to emotion data
    onEmotionClick(emotion) {
      this.emotion = emotion;
      console.log(this.emotion);
    },
    onSubmit() {
      const emotion = this.emotion;
      // check the emtion value
      if (emotion == null) {
        //console.log("error");
        this.error = true;
      } else {
        this.$store.commit("emotion/submit", this.newEmotion);
        //console.log(this.$store.state.emotion.list);
        this.$emit("hide-form");
      }
    },
    // set the size of icon larger if it is choosen
    getSize(emotion) {
      if (this.emotion == emotion) {
        return 50;
      } else {
        return 40;
      }
    }
  },
  props: {
    // value must have props: emotion, story and created_at
    value: {
      type: Object,
      default: null
    }
  },
  mounted() {
    // assign values from props to components datas if prop is assigned
    //console.log(this.value);
    if (this.value) {
      console.log("mounted");
      const editedEmotion = this.value;
      this.emotion = editedEmotion.emotion;
      this.story = editedEmotion.story;
      this.created_at = editedEmotion.created_at;
    }
  }
};
</script>
