<!-- 
  later: creat form components to reuse for login and sign in form  
-->
<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12 login-card">
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-toolbar-title class="login-title">Login</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form class="login-form">
            <v-text-field label="Email" name="email" v-bind:prepend-icon="accountIcon" type="text"></v-text-field>
            <v-text-field
              id="password"
              label="Password"
              name="password"
              v-bind:prepend-icon="passwordIcon"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary">Login</v-btn>
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
      accountIcon: mdiAccountCircle,
      passwordIcon: mdiLock
    };
  },
  layout: "plain"
};
</script>

<style>
.login-card {
  padding: 1em;
}
.login-title {
  text-transform: uppercase;
  font-weight: bold;
}
</style>