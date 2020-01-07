<template>
  <div class="col-2">
    <div class="row">
      <h3>{{listData.title}}</h3>
    </div>
    <div class="row">
      <div class="input-group input-group-sm mb-3">
        <input type="text" class="form-control" placeholder="New Task" />
        <button class="btn btn-primary">Submit</button>
      </div>
    </div>
    <div class="row">
      <div class="col">Task Component will go here</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: ["listData"]
};
</script>

<style scoped>
</style>
