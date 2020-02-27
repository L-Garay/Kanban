<template>
  <div class="background container-fluid">
    <div class="row">
      <div class="col-8 offset-2 text-center mb-4">
        <h4 class="title">Here are your bans of Kan!!!</h4>
      </div>
      <div class="col-2">
        <div class="div d-flex justify-content-end">
          <p class="username">{{user.name}}</p>
          <button @click="logout" class="btn btn-danger logoutBtn">Logout</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-3 offset-1">
        <form class="d-flex flex-column" @submit.prevent="addBoard">
          <input
            type="text"
            class="formTitle"
            placeholder="  Title"
            v-model="newBoard.title"
            required
          />
          <textarea
            v-model="newBoard.description"
            class="form-control formDescription"
            cols="30"
            rows="3"
            maxlength="300"
            placeholder="Description"
          ></textarea>
          <button class="createBtn btn btn-sm" type="submit">Create Board</button>
        </form>
      </div>
      <div class="boardsList col-4 offset-3">
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
              <i class="fas fa-trash-alt deleteBtn" @click="deleteBoard(board._id)"></i>
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
  font-size: 4rem;
  font-family: "Jacques Francois Shadow", cursive;
  /* color: red; */
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
/* .createBtn {
  background-color: green;
  color: red;
} */
.deleteBtn {
  color: red;
}
.deleteBtn:hover {
  cursor: pointer;
  color: green;
}
.logoutBtn {
  color: rgb(93, 248, 79);
  text-shadow: 1pt 1pt 1pt black;
  border: 1pt solid rgb(93, 248, 79);
}
.logoutBtn:hover {
  color: white;
  background-color: rgb(255, 0, 0);
  box-shadow: 2pt 2pt 2pt black;
  cursor: pointer;
  border: 1pt solid white;
}
.formTitle {
  background-color: rgba(17, 173, 25, 0.8);
  color: white;
  text-shadow: 1pt 1pt 1pt black;
}
.formDescription {
  background-color: rgb(255, 0, 0, 0.6);
  color: white;
  text-shadow: 1pt 1pt 1pt black;
}
::placeholder {
  color: white;
  text-shadow: 1pt 1pt 1pt black;
}
.createBtn {
  background-color: rgb(255, 0, 0, 0.8);
  border: 1pt solid rgb(93, 248, 79);
  width: 120px;
  align-self: center;
  margin-top: 10pt;
  color: rgb(81, 252, 47);
  text-shadow: 1pt 1pt 1pt black;
}
.createBtn:hover {
  background-color: red;
  border: 1pt solid white;
  width: 120px;
  align-self: center;
  margin-top: 10pt;
  color: white;
  box-shadow: 2pt 2pt 2pt grey;
}
</style>