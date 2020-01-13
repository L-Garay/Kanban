<template>
  <div class="background container-fluid board">
    <div class="row">
      <div class="col">
        <router-link id="routerLink" :to="{name: 'boards'}">Back to the Boards</router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12 boardInfo">
        <b>{{board.title}}</b>
        | {{board.description}}
      </div>
      <div class="col-4 offset-4">
        <form @submit="addList" class="form-group">
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
      console.log(list);

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
.background {
  background-image: url("../assets/lemon.jpg");
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
}
#routerLink {
  color: black;
}
.boardInfo {
  margin: 5pt 0 10pt 0;
  font-size: 1.5rem;
}
.listArea {
  display: flex;
}
</style>
