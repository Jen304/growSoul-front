<template>
  <div>{{title}}</div>
</template>

<script>
export default {
  beforeCreate() {
    console.log("change");
    this.$store.commit("page/title", "Home");
  },
  computed: {
    title() {
      console.log(this.$store.state.page.title);
      return this.$store.state.page.title;
      //return "trang";
    }
  },
  methods: {}
};
</script>

