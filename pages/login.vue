<template>
  <v-layout justify-center mt-5>
    <v-flex xs11 sm6 md3>
      <v-card class="elevation-12 pa-3">
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-toolbar-title class="title form-title">Login</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form class="form-content">
            <v-text-field
              v-model="email"
              label="Email"
              name="email"
              prepend-icon="mdi-account-circle"
              type="text"
            ></v-text-field>
            <v-text-field
              v-model="password"
              id="password"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" type="password" @click="onUserSubmit">Submit</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mdiAccountCircle, mdiLock } from "@mdi/js";

export default {
  data() {
    return {
      email: null,
      password: null
    };
  },
  layout: "plain",
  methods: {
    async onUserSubmit() {
      console.log(this.email + " " + this.password);

      const userInfo = { email: this.email, password: this.password };
      try {
        await this.$store.dispatch("auth/userLogin", userInfo);
        this.$router.push("/home");
      } catch (error) {
        console.log(error);
        this.$router.push("/");
      }
    }
  }
};
</script>

