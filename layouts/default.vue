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

      </v-list>
    </v-navigation-drawer>
    <!-- Header -->
    <v-app-bar color="cyan" fixed app dark>
      <v-btn icon to="/home">
        <v-icon large>mdi-home-circle</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>
<script>
//import { inspectToken } from "../services/authService";
import { authRequest } from '../services/connectServer';

export default {
  data() {
    return {
      drawer: null
      // icon list
    };
  },
  // check auth of user
  
  async beforeCreate() {
    try {
        console.log("try user")
        
        this.$store.dispatch('auth/checkTokenFirstLoaded', true);
    } catch (e) {
        console.log('error occur')
        console.log(e);
        this.$router.push('/login');
    }
  },
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