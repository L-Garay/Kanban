<template>
  <div class="task">
    <p class="taskTitle">
      {{taskData.description}}
      <i @click="deleteTask(taskData)" class="fas fa-backspace deleteBtn"></i>
    </p>
    <div class="dropdown dropDown">
      <button
        class="btn btn-sm dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
      >Move to new List</button>
      <div class="dropdown-menu">
        <p
          v-for="list in lists"
          :key="list._id"
          class="dropdown-item"
          @click="moveTask(list._id)"
        >{{list.title}}</p>
      </div>
    </div>
    <p @click="toggleComments" class="commentLink">Comments</p>
    <div v-if="commentArea">
      <div>
        <form @submit="addComment(taskData)" class="form-group">
          <input
            v-model="newComment.description"
            class="form-control"
            type="text"
            placeholder="What you want to say"
          />
          <button class="btn btn-sm" type="submit">Submit Comment</button>
        </form>
      </div>

      <div v-for="comment in comments" :key="comment._id">
        <comment :commentData="comment" />
      </div>
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
      commentArea: false,
      newComment: {
        description: "",
        listId: "",
        authorId: "",
        boardId: "",
        taskId: ""
      }
    };
  },
  mounted() {
    return this.$store.dispatch("getComments", { taskId: this.taskData._id });
  },
  computed: {
    comments() {
      return this.$store.state.comments[this.taskData._id];
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  methods: {
    deleteTask(taskData) {
      this.$store.dispatch("deleteTask", taskData);
    },
    moveTask(listId) {
      let updatedTask = {
        oldListId: this.taskData.listId,
        listId: listId,
        taskId: this.taskData._id
      };
      this.$store.dispatch("moveTask", updatedTask);
    },
    toggleComments() {
      if (this.commentArea == false) {
        this.commentArea = true;
      } else if (this.commentArea == true) {
        this.commentArea = false;
      }
    },
    addComment(taskData) {
      let comment = {
        description: this.newComment.description,
        listId: this.taskData.listId,
        authorId: this.taskData.authorId,
        boardId: this.taskData.boardId,
        taskId: this.taskData._id
      };
      this.$store.dispatch("addComment", comment);
      this.newComment = {
        description: "",
        listId: "",
        authorId: "",
        boardId: "",
        taskId: ""
      };
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
  text-shadow: 1pt 1pt 5pt grey;
}
.commentLink {
  font-size: 10px;
  padding: 0;
  margin: 0;
}
.commentLink:hover {
  color: white;
  text-shadow: 0 0 20px black;
  cursor: pointer;
}
.dropdown-menu {
  background-color: rgb(247, 211, 9);
  border: 1px solid black;
}
.dropdown-item {
  color: black;
  cursor: pointer;
}
.dropdown-item:hover {
  background-color: rgb(247, 211, 9);
  color: red;
}
.deleteBtn {
  color: yellow;
  text-shadow: 1pt 1pt 1pt black;
}
.deleteBtn:hover {
  color: red;
  cursor: pointer;
}
button {
  border: 1pt solid orange;
  color: black;
}
button:hover {
  border: 1pt solid orange;
  color: white;
  text-shadow: 0 0 3px black;
  box-shadow: 0 0 50px orange;
}
</style>