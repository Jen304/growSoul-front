<template>
  <v-container fluid fill-height>
    <story-form></story-form>
    <stories-summay></stories-summay>
  </v-container>
</template>
<script>
import StoryForm from "../components/StoryForm";
import StoriesSummary from "../components/StoriesSummary";
export default {
  components: {
    "story-form": StoryForm,
    "stories-summay": StoriesSummary
  }
};
</script>