import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router/index";
import AuthService from "../AuthService";

Vue.use(Vuex);

//Allows axios to work locally or live
let base = window.location.host.includes("localhost:8080")
  ? "//localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 10000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: {},
    comments: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setBoards(state, boards) {
      state.boards = boards;
    },
    resetState(state) {
      state.user = {};
      state.boards = [];
      state.activeBoard = {};
    },
    setLists(state, listData) {
      state.lists = listData;
    },
    setTasks(state, newTask) {
      Vue.set(state.tasks, newTask.listId, newTask.tasks);
    },
    setComments(state, commentData) {
      Vue.set(state.comments, commentData.taskId, commentData.comments);
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds);
        commit("setUser", user);
        router.push({ name: "boards" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds);
        commit("setUser", user);
        router.push({ name: "boards" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout();
        if (!success) {
        }
        commit("resetState");
        router.push({ name: "login" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    //#endregion

    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get("boards").then(res => {
        commit("setBoards", res.data);
      });
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post("boards", boardData).then(serverBoard => {
        dispatch("getBoards");
      });
    },
    async deleteBoard({ commit, dispatch }, boardId) {
      await api.delete("boards/" + boardId);
      dispatch("getBoards");
    },
    //#endregion

    //#region -- LISTS --
    async addList({ commit, dispatch }, listData) {
      console.log("from store", listData);

      await api.post("lists", listData);

      dispatch("getLists", listData.boardId);
    },
    async getLists({ commit, dispatch }, boardId) {
      let res = await api.get("boards/" + boardId + "/lists");
      commit("setLists", res.data);
    },
    async deleteList({ commit, dispatch }, listData) {
      await api.delete("lists/" + listData._id);

      dispatch("getLists", listData.boardId);
    },

    //#endregion
    //#region -- Tasks --
    async addTask({ commit, dispatch }, taskData) {
      await api.post("tasks", taskData);
      dispatch("getTasks", taskData);
    },
    async getTasks({ commit, dispatch }, data) {
      let res = await api.get("lists/" + data.listId + "/tasks");
      let newTask = {
        listId: data.listId,
        tasks: res.data
      };
      commit("setTasks", newTask);
    },
    async deleteTask({ commit, dispatch }, taskData) {
      await api.delete("tasks/" + taskData._id);
      dispatch("getTasks", taskData);
    },
    async moveTask({ commit, dispatch }, updatedTask) {
      console.log(updatedTask);
      let res = await api.put("tasks/" + updatedTask.taskId, updatedTask);
      dispatch("getTasks", { listId: updatedTask.listId });
      dispatch("getTasks", { listId: updatedTask.oldListId });
      console.log(res.data);
    },
    //#endregion

    //#region -- Comments --
    async addComment({ commit, dispatch }, commentData) {
      await api.post("comments", commentData);
      dispatch("getComments", commentData);
    },
    async getComments({ commit, dispatch }, data) {
      let res = await api.get("tasks/" + data.taskId + "/comments");
      let newComment = {
        taskId: data.taskId,
        comments: res.data
      };
      commit("setComments", newComment);
    },
    async deleteComment({ commit, dispatch }, commentData) {
      await api.delete("comments/" + commentData._id);
      dispatch("getComments", commentData);
    }

    //#endregion
  }
});
