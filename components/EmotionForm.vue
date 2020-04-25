<template>
  <v-layout justify-center v-if="!questionPackage.hide">
    <v-flex xs11 sm6 md3>
      <v-card class="elevation-10">
        <v-card-title>{{questionPackage.question}}</v-card-title>
        <v-list class="option">
          <v-list-item
            v-for="(option, i) in questionPackage.options"
            :key="i"
            @click="$emit('customMethod',option.value)"
          >
            <v-list-item-avatar v-if="option.icon">
              <v-icon>{{ option.icon}}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>{{option.text || option.value}}</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
// import icon
import {
  mdiEmoticonKiss,
  mdiEmoticonWink,
  mdiEmoticonCry,
  mdiEmoticonAngry,
  mdiEmoticonSad,
  mdiEmoticonDead
} from "@mdi/js";
export default {
  name: "emotion-form",
  data() {
    return {
      // pair value and icon
    };
  },
  props: ["questionPackage"],
  methods: {
    onClickElement() {
      console.log(this.questionPackage);
      this.$emit("customMethod", this.questionPackage.value);
    }
  }
};
</script>
<style scoped>
.option {
  text-transform: capitalize;
}
</style>