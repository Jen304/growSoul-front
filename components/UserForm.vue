<template>
  <v-card class="elevation-12 pa-3">
    <v-toolbar flat>
      <v-spacer></v-spacer>
      <v-toolbar-title class="title form-title">{{formTitle}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-form class="form-content">
        <v-text-field label="Email" name="email" v-bind:prepend-icon="accountIcon" type="text"></v-text-field>
        <v-text-field
          id="password"
          label="Password"
          name="password"
          v-bind:prepend-icon="passwordIcon"
          type="password"
          @user-submit="onUserSubmit"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary">{{ formTitle }}</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
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
  props: ["formTitle"],
  methods: {
    onSubmit() {
      this.$emit("user-submit");
    }
  }
};
</script>

<style>
.form-title {
  text-transform: uppercase;
}
</style>