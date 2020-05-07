<template>
  <v-btn color="primary" @click.stop="logout">Logout</v-btn>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    }
  }
};
</script>