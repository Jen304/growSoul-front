<template>
  <v-layout justify-center mt-5>
    <v-flex xs11 sm6 md3>
      <v-card class="elevation-12 pa-3">
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-toolbar-title class="title form-title">Sign up</v-toolbar-title>
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
            <v-text-field
              v-model="passwordConfirm"
              id="password"
              label="Confirm password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              :rules="passwordConfirmRules"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" type="password" @click="validate">Submit</v-btn>
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
      passwordConfirm: null,
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [v => !!v || "Password is required"],
      passwordConfirmRules: [
        v => !!v || "Confirm password is required",
        v => v == this.password || "Password confirm is not matched"
      ]
    };
  },
  layout: "plain",
  methods: {
    async signup() {
      console.log(this.email + " " + this.password);

      const userInfo = { email: this.email, password: this.password };
      try {
        await this.$store.dispatch("auth/userSignup", userInfo);
        this.$router.push("/home");
      } catch (error) {
        console.log(error);
        this.$router.push("/");
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.signup();
      }
    }
  }
};
</script>

