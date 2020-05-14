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
      <v-text-field label="Write something about it" counter outlined v-model="emotion.story"></v-text-field>
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
      key: 1,
      question: "How are you now?",
      emotion: {
        value: null,
        story: null,
        created_at: null
      },

      // show error message if use does not chose emotion
      error: false
    };
  },
  computed: {
    // return emotion list with icon from store
    emotionList() {
      return this.$store.getters["emotion/emotionList"];
    }
  },
  methods: {
    // assign chosen emotion to emotion data
    onEmotionClick(emotion) {
      this.emotion.value = emotion;
    },
    onSubmit() {
      const emotion = this.emotion.value;
      // check the emtion value
      if (emotion == null) {
        //console.log("error");
        this.error = true;
      } else {
        this.$store.dispatch("emotion/addOrUpdateEmotion", this.emotion);
        //console.log(this.$store.state.emotion.list);
        this.$emit("hide-form");
        this.resetForm();
      }
    },
    // set the size of icon larger if it is choosen
    getSize(emotion) {
      if (this.emotion.value == emotion) {
        return 50;
      } else {
        return 40;
      }
    },
    resetForm() {
      this.emotion = {
        value: null,
        story: null,
        created_at: null
      };
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
    console.log(this.value);
    if (this.value) {
      this.emotion = Object.assign({}, this.value);
      //his.story = editedEmotion.story;
      //this.created_at = editedEmotion.created_at;
    }
  }
};
</script>
