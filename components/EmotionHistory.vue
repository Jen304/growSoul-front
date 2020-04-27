<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md9>
      <p class="display-1">History</p>
      <v-divider></v-divider>

      <v-card outlined v-for="(emotion, i) in lastEmotion" :key="i">
        <v-card-title>
          <v-icon large class="mr-2">{{ emotion.icon}}</v-icon>
          {{ emotion.emotion}}
        </v-card-title>
        <v-card-subtitle>{{getTime()}}</v-card-subtitle>
        <v-card-text>{{ emotion.story}}</v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: "emotion-history",
  computed: {
    lastEmotion() {
      console.log(this.$store.getters["emotion/fullEmotionListWithIcon"]);
      return this.$store.getters["emotion/fullEmotionListWithIcon"];
    }
  },
  methods: {
    getTime(time) {
      return this.$moment(time).fromNow();
    }
  }
};
</script>