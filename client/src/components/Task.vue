<template>
  <div class="task">
    <p class="taskTitle">
      {{taskData.description}}
      <i @click="deleteTask(taskData)" class="fas fa-backspace"></i>
    </p>
    <p @click="toggleComments" class="commentLink">Comments</p>
    <div v-if="commentArea">
      <div>
        <form @submit="addComment" class="form-group">
          <input
            v-model="newComment.description"
            class="form-control"
            type="text"
            placeholder="What you want to say"
          />
          <button class="btn btn-sm btn-success" type="submit">Submit Comment</button>
        </form>
      </div>
      <div>comment component will go here</div>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment.vue";
export default {
  name: "Task",
  props: ["taskData"],
  data() {
    return {
      commentArea: false
    };
  },

  methods: {
    deleteTask(taskData) {
      this.$store.dispatch("deleteTask", taskData);
    },
    toggleComments() {
      if (this.commentArea == false) {
        this.commentArea = true;
      } else if (this.commentArea == true) {
        this.commentArea = false;
      }
    }
  },
  components: {
    Comment
  }
};
</script>

<style scoped>
.task {
  border: 1px solid black;
}
.taskTitle {
  padding-bottom: 0;
  margin-bottom: 0;
}
.commentLink {
  font-size: 10px;
  padding: 0;
  margin: 0;
}
.commentLink:hover {
  color: blue;
  cursor: pointer;
}
</style>