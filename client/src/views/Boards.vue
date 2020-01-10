<template>
  <div class="background container-fluid">
    <div class="row">
      <div class="col-8 offset-2 text-center">
        <h4 class="title">Here are your bans of Kan!!!</h4>
      </div>
      <div class="col-2">
        <div class="div d-flex justify-content-end">
          <p class="username">{{user.name}}</p>
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
      <div class="boardsList col-5 offset-3">
        <div>
          <h4 class="boardsTitle">Your boards</h4>
        </div>
        <ul v-for="board in boards" :key="board._id">
          <li class="listItem">
            <router-link
              id="routerLink"
              :to="{name: 'board', params: {boardId: board._id}}"
            >{{board.title}}</router-link>||
            <span>{{board.description}}</span>
            <span>
              <i class="fas fa-trash-alt" @click="deleteBoard(board._id)"></i>
            </span>
          </li>
        </ul>
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
.title {
  font-size: 5rem;
  font-family: "Jacques Francois Shadow", cursive;
}
.username {
  font-size: 18pt;
  margin-right: 10pt;
  margin-bottom: 0;
  display: flex;
  align-items: center;
}
.listItem {
  text-align: left;
  padding-left: 20px;
}
ul {
  list-style: none;
}
ul li {
  color: white;
}
ul li span {
  color: white;
}
li::before {
  content: "🍓";
  padding-right: 15px;
}

.boardsList {
  background-color: rgb(255, 0, 0, 0.4);
}
.boardsList:hover {
  background-color: #c20426;
}
#routerLink {
  color: green;
  text-shadow: 1px 1px 1px black;
}
.boardsTitle {
  color: white;
}
</style>