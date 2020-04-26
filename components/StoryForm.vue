<template>
  <v-layout justify-center>
    <v-flex>
      <v-card class="elevation-5">
        <v-card-title>New story</v-card-title>
        <v-card-text>
          <v-form>
            <v-textarea solo counter clearable v-model="story"></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submitStory">Submit</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: "story-form",
  data() {
    return {
      story: null
    };
  },
  methods: {
    submitStory() {
      console.log("submit story");
      this.$store.commit("story/add", this.getStory());
      this.story = null;
    },
    getStory() {
      return {
        content: this.story,
        created_at: new Date()
      };
    }
  }
};
</script>