import mongoose from "mongoose";
import Task from "../models/Task";

const _repository = mongoose.model("Task", Task);

class TaskService {
  async moveTask(taskId, newListId) {
    let data = await _repository.findOneAndUpdate(
      { _id: taskId },
      { listId: newListId },
      { new: true }
    );
    return data;
  }
  async getTasksByListId(id) {
    let data = await _repository.find({ listId: id });
    return data;
  }
  async deleteTask(id) {
    let data = await _repository.findOneAndRemove({ _id: id });
    return data;
  }
  async createTask(body) {
    let data = await _repository.create(body);
    return data;
  }
  async getTasks(id) {
    let data = await _repository.find({ authorId: id });
    return data;
  }
}

const _taskService = new TaskService();
export default _taskService;
