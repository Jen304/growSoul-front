<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8>
      <p class="display-1">History</p>
      <v-divider></v-divider>
      <v-card outlined v-for="(emotion, i) in lastEmotion" :key="i">
        <v-card-title>
          <v-icon
            large
            class="mr-2"
            :color="getEmotionColor(emotion.emotion)"
          >{{ getEmotionIcon(emotion.emotion)}}</v-icon>
          {{ getEmotionString(emotion.emotion)}}
          <v-spacer></v-spacer>
          <v-btn icon @click.stop="openDialog(emotion)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-subtitle>{{getTime(emotion.created_at)}}</v-card-subtitle>
        <v-card-text>{{ emotion.story}}</v-card-text>
      </v-card>
    </v-flex>
    <v-dialog v-model="dialog" max-width="350">
      <emotion-form @hide-form="dialog = false" :value="selectedEmotion"></emotion-form>
    </v-dialog>
  </v-layout>
</template>
<script>
import EmotionFormVue from "./EmotionForm.vue";
export default {
  name: "emotion-history",
  components: {
    "emotion-form": EmotionFormVue
  },
  data() {
    return {
      dialog: false,
      selectedEmotion: null
    };
  },
  computed: {
    lastEmotion() {
      //console.log(this.$store.getters["emotion/fullEmotionListWithIcon"]);
      return this.$store.state.emotion.list;
    }
  },
  methods: {
    getTime(time) {
      return this.$moment(time).fromNow();
    },
    openDialog(emotion) {
      this.selectedEmotion = emotion;
      this.dialog = true;
    }
  }
};
</script>