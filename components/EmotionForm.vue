<template>
  <v-layout justify-center v-if="!questionPackage.hide" class="emotion-card">
    <v-flex xs12 sm7 md6>
      <v-card class="elevation-5">
        <v-card-title>{{ questionPackage.question }}</v-card-title>
        <v-list class="option">
          <v-list-item
            v-for="(option, i) in questionPackage.options"
            :key="i"
            @click="$emit('customMethod',option)"
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
  props: ["questionPackage"]
};
</script>
<style scoped>
.option {
  text-transform: capitalize;
}
@media only screen and (max-width: 600px) {
  .emotion-card {
    width: 90%;
  }
}
</style>