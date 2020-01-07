<template>
  <div class="container-fluid board">
    <div class="row">
      <div class="col">
        <router-link :to="{name: 'boards'}">Boards</router-link>
      </div>
    </div>
    <div class="row">
      <div class="col">{{board.title}} | {{board.description}}</div>

      <div class="input-group input-group-sm mb-3">
        <input
          @submit="addList"
          v-model="newList.title"
          type="text"
          class="form-control"
          placeholder="New List"
        />
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </div>
    <div class="row">
      <div class="col">New list goes here</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "board",
  data() {
    return {
      newList: {
        title: ""
      }
    };
  },
  methods: {
    addList() {
      let list = this.newList;
      this.$store.dispatch("addList", list);
      this.newList = {
        title: ""
      };
    }
  },
  computed: {
    board() {
      return (
        //FIXME This does not work on page reload because the boards array is empty in the store
        this.$store.state.boards.find(b => b._id == this.boardId) || {
          title: "Loading..."
        }
      );
    }
  },
  props: ["boardId"]
};
</script>
