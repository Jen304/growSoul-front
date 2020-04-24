<template>
  <v-layout align-center justify-center>
    <v-flex xs11 sm6 md3>
      <v-card class="elevation-12 pa-3">
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-toolbar-title class="title form-title">{{formTitle}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form class="form-content">
            <slot></slot>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary">{{ formTitle }}</v-btn>
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
  props: ["formTitle"]
};
</script>

<style>
.form-title {
  text-transform: uppercase;
}
</style>