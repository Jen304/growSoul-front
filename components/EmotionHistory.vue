<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8>
      <div class="headline">
        <v-layout>
          <p>Lastest emotion</p>
          <v-spacer></v-spacer>
          <v-btn to="/calendar">
            <v-icon>mdi-calendar-heart</v-icon>
          </v-btn>
        </v-layout>
      </div>

      <v-divider></v-divider>
      <v-card outlined v-for="(emotion, i) in lastEmotion" :key="i">
        <v-card-title>
          <v-icon
            large
            class="mr-2"
            :color="getEmotionColor(emotion.value)"
          >{{ getEmotionIcon(emotion.value)}}</v-icon>
          {{ getEmotionString(emotion.value)}}
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
      <emotion-form @hide-form="dialog = false" :value="selectedEmotion" :key="emotionKey"></emotion-form>
    </v-dialog>
  </v-layout>
</template>
<script>
import EmotionFormVue from "./EmotionForm.vue";
import Dialog from "../assets/mixins/Dialog";

export default {
  name: "emotion-history",
  data() {
    return {
      list: []
    };
  },
  // form to edit emotion
  components: {
    "emotion-form": EmotionFormVue
  },
  mixins: [Dialog],
  mounted() {
    this.list = this.getListFromBackEnd();
  },

  computed: {
    lastEmotion() {
      // return state so it will update according to vuex state
      return this.$store.state.emotion.list;
    }
  },
  methods: {
    // return the interval from now
    getTime(time) {
      return this.$moment(time).fromNow();
    },
    async getListFromBackEnd() {
      await this.$store.dispatch("emotion/getEmotionList");
      return this.$store.state.emotion.list;
    }
  }
};
</script>