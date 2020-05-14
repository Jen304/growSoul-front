<template>
  <v-app>
    <!-- side navigation -->
    <v-navigation-drawer fixed v-model="drawer" right app>
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Grow your soul</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item to="/home">
          <v-list-item-action>
            <v-icon>mdi-home-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/calendar">
          <v-list-item-action>
            <v-icon>mdi-calendar-heart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Calendar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click.stop="logout">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--
        <v-list-item @click>
          <v-list-item-action>
            <v-icon>{{ settingIcon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Setting</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click>
          <v-list-item-action>
            <v-icon>{{ themeIcon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Change theme</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click>
          <v-list-item-action>
            <v-icon>{{ chartIcon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Emotional analysis</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click>
          <v-list-item-action>
            <v-icon>{{ languageIcon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Language</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click>
          <v-list-item-action>
            <v-icon>{{ infoIcon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About us</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        -->
      </v-list>
    </v-navigation-drawer>
    <!-- Header -->
    <v-app-bar color="cyan" fixed app dark>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <!--
    <v-footer color="cyan" app>
      <v-spacer></v-spacer>
      <span class="white--text">Grow your soul &copy; 2020</span>
    </v-footer>-->
  </v-app>
</template>
<script>
//import { inspectToken } from "../services/authService";

export default {
  data() {
    return {
      drawer: null
      // icon list
    };
  },
  // check auth of user

  middleware: ["auth"],
  computed: {
    // Each page should register the title or it will should defaut title
    title() {
      //console.log(this.$store.state.page.title);
      return this.$store.state.page.title;
      //return "trang";
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    }
  }
};
</script>