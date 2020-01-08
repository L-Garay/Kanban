<template>
  <div class="shadow-lg">
    <div class="d-flex justify-content-between p-1">
      <h3 class="center">{{listData.title}}</h3>
      <i class="fas fa-trash-alt fa-lg icon" @click="deleteList(listData)"></i>
    </div>
    <div>
      <div class="input-group input-group-sm mb-3 px-2">
        <input type="text" class="form-control" placeholder="New Task" />
        <button class="btn btn-primary btn-sm">Submit</button>
      </div>
    </div>
    <div>
      <div>Task Component will go here</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: ["listData"],

  methods: {
    deleteList(listData) {
      this.$store.dispatch("deleteList", listData);
    }
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
