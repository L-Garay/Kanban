<template>
  <div class="shadow-lg">
    <div class="d-flex justify-content-between p-1">
      <h3 class="center">{{listData.title}}</h3>
      <i class="fas fa-trash-alt fa-lg icon" @click="deleteList(listData)"></i>
    </div>
    <div>
      <form @submit="addTask(listData)" class="form-group px-1">
        <input
          v-model="newTask.description"
          class="form-control"
          type="text"
          placeholder="New task"
        />
        <button class="btn btn-sm btn-success" type="submit">Submit the Task</button>
      </form>
    </div>
    <div v-for="task in tasks" :key="task._id">
      <task :taskData="task" />
    </div>
  </div>
</template>

<script>
import Task from "@/components/Task.vue";
export default {
  name: "List",
  props: ["listData"],
  data() {
    return {
      newTask: {
        description: "",
        listId: "",
        authorId: "",
        boardId: ""
      }
    };
  },
  methods: {
    deleteList(listData) {
      this.$store.dispatch("deleteList", listData);
    },
    addTask(listData) {
      let task = {
        description: this.newTask.description,
        listId: listData._id,
        authorId: listData.authorId,
        boardId: listData.boardId
      };
      this.$store.dispatch("addTask", task);

      this.newTask = {
        description: "",
        listId: "",
        authorId: "",
        boardId: ""
      };
    }
  },
  mounted() {
    this.$store.dispatch("getTasks", { listId: this.listData._id });
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listData._id];
    }
  },
  components: {
    Task
  }
};
</script>

<style scoped>
.icon {
  font-size: 1rem;
  padding-top: 8pt;
}
.icon:hover {
  color: red;
  cursor: pointer;
}
</style>
