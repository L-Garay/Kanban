<template>
  <div class="background container-fluid">
    <div class="row">
      <div class="col d-flex justify-content-between">
        <h4>Here are your bans of Kan!!!</h4>
        <div class="div d-flex">
          <p>{{user.name}} ||</p>
          <button @click="logout" class="btn btn-danger">Logout</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <form class="d-flex flex-column" @submit.prevent="addBoard">
          <input type="text" placeholder="  Title" v-model="newBoard.title" required />
          <textarea
            v-model="newBoard.description"
            class="form-control"
            cols="30"
            rows="3"
            maxlength="300"
            placeholder="Description"
          ></textarea>
          <button type="submit">Create Board</button>
        </form>
      </div>
      <div class="col-5 offset-3">
        <div>
          <h4>Your boards</h4>
        </div>
        <div v-for="board in boards" :key="board._id">
          <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
          || {{board.description}}
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
<style scoped>
.background {
  background-image: url("../assets/strawb.jpg");
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
}
</style>