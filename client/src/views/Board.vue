<template>
  <div class="container-fluid board">
    <div class="row">
      <div class="col">
        <router-link :to="{name: 'boards'}">Boards</router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12">{{board.title}} | {{board.description}}</div>
      <div class="col-4 offset-4">
        <form @submit="addList" class="form-group">
          Name of List:
          <input
            v-model="newList.title"
            class="form-control"
            type="text"
            placeholder="Name of list"
          />
          <button class="btn btn-sm btn-success" type="submit">Submit List</button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-3 listArea" v-for="list in lists" :key="list._id">
        <list-component :listData="list" />
      </div>
    </div>
  </div>
</template>

<script>
import ListComponent from "@/components/List.vue";
export default {
  name: "board",
  data() {
    return {
      newList: {
        title: "",
        authorId: "",
        boardId: ""
      }
    };
  },
  methods: {
    addList() {
      let list = {
        title: this.newList.title,
        authorId: this.$store.state.user._id,
        boardId: this.$route.params.boardId
      };
      this.$store.dispatch("addList", list);
      this.newList = {
        title: "",
        authorId: "",
        boardId: ""
      };
    }
  },
  mounted() {
    this.$store.dispatch("getBoards");
    this.$store.dispatch("getLists", this.$route.params.boardId);
  },
  computed: {
    board() {
      return (
        this.$store.state.boards.find(b => b._id == this.boardId) || {
          title: "Loading..."
        }
      );
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  props: ["boardId"],
  components: {
    ListComponent
  }
};
</script>
<style scoped>
.listArea {
  display: flex;
}
</style>
