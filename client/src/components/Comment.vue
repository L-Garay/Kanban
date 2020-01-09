<template>
  <div>
    <p>
      {{commentData.description}}
      <i
        @click="deleteComment(commentData)"
        class="eraser fas fa-eraser"
      ></i>
    </p>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: ["commentData"],

  methods: {
    deleteComment(commentData) {
      this.$store.dispatch("deleteComment", commentData);
    }
  }
};
</script>

<style scoped>
.eraser:hover {
  color: red;
  cursor: pointer;
}
</style>