<template>
  <v-container fluid fill-height>
    <user-form form-title="login">
      <v-text-field label="Email" name="email" v-bind:prepend-icon="accountIcon" type="text"></v-text-field>
      <v-text-field
        id="password"
        label="Password"
        name="password"
        v-bind:prepend-icon="passwordIcon"
        type="password"
      ></v-text-field>
    </user-form>
  </v-container>
</template>

<script>
import { mdiAccountCircle, mdiLock } from "@mdi/js";
import UserFormVue from "../components/UserForm.vue";
export default {
  data() {
    return {
      accountIcon: mdiAccountCircle,
      passwordIcon: mdiLock
    };
  },
  layout: "plain",
  components: {
    "user-form": UserFormVue
  }
};
</script>

