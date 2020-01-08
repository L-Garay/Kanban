<template>
  <li>
    {{taskData.description}}
    <i @click="deleteTask(taskData)" class="fas fa-backspace"></i>
  </li>
</template>

<script>
export default {
  name: "Task",
  props: ["taskData"],

  methods: {
    deleteTask(taskData) {
      this.$store.dispatch("deleteTask", taskData);
    }
  }
};
</script>

<style scoped>
</style>