<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col d-flex justify-content-between">
        <h4>WELCOME TO THE BOARDS!!!</h4>
        <div class="div d-flex">
          <p>{{user.name}} ||</p>
          <button @click="logout" class="btn btn-danger">Logout</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <form @submit.prevent="addBoard">
          <input type="text" placeholder="title" v-model="newBoard.title" required />
          <input type="text" placeholder="description" v-model="newBoard.description" />
          <button type="submit">Create Board</button>
        </form>
        <div v-for="board in boards" :key="board._id">
          <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
          <i class="fas fa-trash-alt" @click="deleteBoard(board._id)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    logout() {
      this.$store.dispatch("logout");
    },
    deleteBoard(boardId) {
      this.$store.dispatch("deleteBoard", boardId);
    }
  }
};
</script>