<template >
  <v-container>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat color="white">
            <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">Today</v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on }">
                <v-btn outlined color="grey darken-2" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :now="today"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateEmotion"
            :key="reload"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <!-- card -->
            <v-card color="grey lighten-4" flat>
              <v-toolbar :color="selectedEmotion.color" dark>
                <v-toolbar-title>{{ selectedEmotion.name }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click.stop="openDialog(selectedEmotion.emotion)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>{{selectedEmotion.story}}</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="secondary" @click="selectedOpen = false">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
      <v-dialog v-model="dialog" max-width="350">
        <emotion-form @hide-form="reloadCalendar" :value="selectedEmotion" :key="emotionKey"></emotion-form>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
import EmotionForm from "../components/EmotionForm";
import Dialog from "../assets/mixins/Dialog";
export default {
  beforeCreate() {
    this.$store.commit("page/title", "Calendar");
  },
  components: {
    "emotion-form": EmotionForm
  },
  mixins: [Dialog],

  data: () => ({
    focus: "",
    today: null,
    // default type
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day"
    },
    start: null,
    end: null,
    selectedElement: null,
    selectedOpen: false,
    events: [],
    reload: 0
  }),
  computed: {
    // return the title of the calendar
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }
      // month
      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      // only showed if month of start is different from end
      const prefixMonth = startMonth === endMonth ? "" : startMonth;
      // year
      const startYear = start.year;
      const endYear = end.year;
      // only showed if year of start is different from end
      const prefixYear = startYear === endYear ? "" : startYear;
      // day
      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
          return `${prefixMonth} ${startDay} ${prefixYear} - ${endMonth} ${endDay} ${endYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  // setup the calendar
  mounted() {
    //console.log(this.$store.state.emotion.emotionColors);
    // call updateEmotion function (@change="updateEmotion")
    const timeRange = { start: this.start, end: this.end };
    this.$refs.calendar.checkChange(timeRange);
  },
  methods: {
    // show selected day info
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    // return color according to event color
    getEventColor(event) {
      return event.color;
    },
    // return to today
    setToday() {
      this.focus = this.today;
    },
    // prev range of time according to what type of calendar
    prev() {
      this.$refs.calendar.prev();
    },
    // next range of time according to what type of calendar
    next() {
      this.$refs.calendar.next();
    },
    // show event details
    showEvent({ nativeEvent, event }) {
      const open = () => {
        //console.log(event);
        //console.log(nativeEvent);
        this.selectedEmotion = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };
      // close current card and open new one
      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    async updateEmotion({ start, end }) {
      let emotionList = [];
      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      //console.log(max);
      // use getter, need to force re-render as it does not update after vuex state change
      //emotionList = this.$store.getters["emotion/emotionListWithinRangeTime"]({
      //  start: min,
      //  end: max
      //});
      emotionList = await this.getListFromBackEnd({ start: min, end: max });
      //console.log(emotionList);
      const event = [];

      for (let emotion of emotionList) {
        event.push({
          name: this.getEmotionString(emotion.value), //this.$store.state.emotion.emotionString[emotion.emotion],
          emotion: emotion,
          start: this.formatDate(new Date(emotion.created_at)),
          end: this.formatDate(new Date(emotion.created_at)),
          color: this.getEmotionColor(emotion.value), //this.$store.state.emotion.emotionColors[emotion.emotion],
          story: emotion.story,
          created_at: emotion.created_at
        });
      }
      //console.log(event);
      this.events = event;
      this.start = start;
      this.end = end;
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
    formatDate(a) {
      return `${a.getFullYear()}-${a.getMonth() +
        1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`;
    },
    // re load the calendar after edit emotion
    reloadCalendar() {
      this.dialog = false;
      //console.log("reload");
      this.reload++;
    },
    async getListFromBackEnd({ start, end }) {
      console.log(end);
      await this.$store.dispatch("emotion/getListWithTimeRange", {
        start,
        end
      });
      return this.$store.state.emotion.list;
    }
  }
};
</script>