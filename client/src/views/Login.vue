<template>
  <div class="login container-fluid">
    <div class="row">
      <div class="col-12">
        <h1 class="headline">Welcome to the KanBan</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-6 offset-3 d-flex justify-content-center">
        <form class="d-flex flex-column flex-sm-row" v-if="loginForm" @submit.prevent="loginUser">
          <input class="login-input" type="email" v-model="creds.email" placeholder="EMAIL" />
          <input
            class="login-input"
            type="password"
            v-model="creds.password"
            placeholder="PASSWORD"
          />
          <button class="btn login-btn" type="submit">Login</button>
        </form>
        <form class="d-flex flex-column flex-sm-row" v-else @submit.prevent="register">
          <input class="login-input" type="text" v-model="newUser.name" placeholder="NAME" />
          <input class="login-input" type="email" v-model="newUser.email" placeholder="EMAIL" />
          <input
            class="login-input"
            type="password"
            v-model="newUser.password"
            placeholder="PASSWORD"
          />
          <button class="btn register-btn" type="submit">Create Account</button>
        </form>
      </div>
      <div class="col-6 offset-3 pt-2">
        <div class="action" @click="loginForm = !loginForm">
          <p v-if="loginForm">No account? Click here to Register</p>
          <p v-else>Already have an account? Click here to Login</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router/index.js";

export default {
  name: "login",
  data() {
    return {
      loginForm: true,
      creds: {
        email: "",
        password: ""
      },
      newUser: {
        email: "",
        password: "",
        name: ""
      }
    };
  },
  beforeCreate() {
    if (this.$store.state.user._id) {
      this.$router.push({ name: "boards" });
    }
  },
  methods: {
    register() {
      this.$store.dispatch("register", this.newUser);
    },
    loginUser() {
      this.$store.dispatch("login", this.creds);
    }
  }
};
</script>

<style scoped>
.action {
  cursor: pointer;
  opacity: 0.4;
}
.action:hover {
  opacity: 1;
  color: rgb(240, 240, 130);
  text-shadow: 1px 1px 1px black;
}
.login {
  background-image: url("https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2009&q=80");
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
}
.login-input {
  margin-right: 3pt;
  background-color: rgb(240, 240, 130);
}
.login-btn {
  border: 3px solid rgb(97, 92, 92);
  box-shadow: 4px -2px 3px black;
}
.login-btn:hover {
  cursor: pointer;
  color: rgb(241, 120, 140);
  text-shadow: 1px 1px 1px pink;
  border: 3px solid rgb(240, 240, 130);
  box-shadow: 4px -2px 3px rgb(240, 240, 130);
}
.register-btn {
  border: 3px solid rgb(97, 92, 92);
  box-shadow: 4px -2px 3px black;
}
.register-btn:hover {
  cursor: pointer;
  color: rgb(233, 233, 73);
  text-shadow: 1px 1px 1px black;
  border: 3px solid rgb(241, 120, 140);
  box-shadow: 4px -2px 3px rgb(241, 120, 140);
}
::placeholder {
  color: rgb(238, 143, 159);
  text-shadow: 1px 1px 1px pink;
}
.headline {
  /* font-family: "Unica One", cursive; */
  font-size: 5rem;
  font-family: "Jacques Francois Shadow", cursive;
}
</style>