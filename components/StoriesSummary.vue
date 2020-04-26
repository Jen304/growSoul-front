<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md9>
      <p class="display-1">Last story</p>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="(story, i) in storyList" :key="i">
          <v-list-item-content>
            <v-list-item-subtitle>{{getTime(story.created_at)}}</v-list-item-subtitle>
            <p>{{ story.content}}</p>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: "emotion-summary",
  computed: {
    storyList() {
      console.log("re-render");
      const list = [...this.$store.state.story.list];
      list.sort((current, next) => next.created_at - current.created_at);

      return list;
    }
  },
  methods: {
    getTime(time) {
      return this.$moment(time).fromNow();
    }
  }
};
</script>