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
          <v-form class="form-content" ref="form">
            <v-text-field
              v-model="email"
              label="Email"
              name="email"
              prepend-icon="mdi-account-circle"
              :rules="emailRules"
              type="text"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              id="password"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              :rules="passwordRules"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" type="password" @click="validate">Login</v-btn>
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
      password: null,
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [v => !!v || "Password is required"]
    };
  },
  layout: "plain",
  methods: {
    async login() {
      console.log(this.email + " " + this.password);

      const userInfo = { email: this.email, password: this.password };
      try {
        await this.$store.dispatch("auth/userLogin", userInfo);
        this.$router.push("/home");
      } catch (error) {
        console.log(error);
        this.$router.push("/login");
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.login();
      }
    }
  }
};
</script>

