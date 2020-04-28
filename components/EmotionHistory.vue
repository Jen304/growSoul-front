<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8>
      <div class="display-1">
        <v-layout>
          <p>History</p>
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
      <emotion-form @hide-form="dialog = false" :value="selectedEmotion" :key="emotionKey"></emotion-form>
    </v-dialog>
  </v-layout>
</template>
<script>
import EmotionFormVue from "./EmotionForm.vue";
export default {
  name: "emotion-history",
  // form to edit emotion
  components: {
    "emotion-form": EmotionFormVue
  },
  data() {
    return {
      //  to open or close dialog
      dialog: false,
      selectedEmotion: null,
      emotionKey: 0
    };
  },
  computed: {
    lastEmotion() {
      return this.$store.state.emotion.list;
    }
  },
  methods: {
    // return the interval from now
    getTime(time) {
      return this.$moment(time).fromNow();
    },
    // open the dialog to allow edit emotion
    // assign the selectedEmotion
    openDialog(emotion) {
      //console.log(this.selectedEmotion);
      const open = () => {
        this.selectedEmotion = emotion;
        // assign new key to force re-render
        this.emotionKey = emotion.created_at;
        this.dialog = true;
      };
      if (this.dialog) {
        this.dialog = false;
        setTimeout(open, 10);
      } else {
        open();
      }
    }
  }
};
</script>