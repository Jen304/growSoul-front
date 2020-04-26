<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md9>
      <p class="display-1">Last update</p>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="(emotion, i) in lastEmotion" :key="i">
          <v-list-item-avatar>
            <v-icon>{{ emotion.icon}}</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>{{ emotion.value}}, {{emotion.level}}</v-list-item-title>
          <v-list-item-subtitle>{{getTime()}}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: "emotion-summary",
  computed: {
    lastEmotion() {
      const lastIndex = this.$store.state.emotion.list.length - 1;
      return [this.$store.state.emotion.list[lastIndex]];
    }
  },
  methods: {
    getTime(time) {
      return this.$moment(time).fromNow();
    }
  }
};
</script>